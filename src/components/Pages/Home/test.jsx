"use client"

import { useState } from "react"
import Image from "next/image"
import CryptoJS from "crypto-js"

// Environment variables - in a real app, these would come from .env.local
const AGENCY_UID = "91fe7789f5c71c2a44f2c81cc6d8c3af"
const AES_KEY = "470b92e4c291dd976cf2234ff2cfd19a"
const PLAYER_PREFIX = "h78cc6_demo"
const SERVER_URL = "https://jsgame.live"
const CURRENCY_CODE = "BDT"

// Game List
const games = [
  {
    uid: "e3b71c6844eb8c30f5ef210ad92725a6",
    name: "Adventure Quest",
    image: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/jili/Plinko.png",
  },
  {
    uid: "a7d12c8899ab4c72f8dc7290b1e7a0c1",
    name: "Fantasy World",
    image: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/jili/Plinko.png",
  },
  {
    uid: "b2e9128834dc4e45a7d3b90f8f8d92a2",
    name: "Speed Racer",
    image: "https://huidu-bucket.s3.ap-southeast-1.amazonaws.com/api/jili/Plinko.png",
  },
]

// Function to encrypt data using AES-256-ECB
function encryptData(data, key) {
  return CryptoJS.AES.encrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString()
}

// Function to decrypt data using AES-256-ECB
function decryptData(data, key) {
  return CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8)
}

// Function to make API requests
async function makeApiRequest(url, payload) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  return response.json()
}

// Function to get Game URL (SEAMLESS)
async function getGameUrlSeamless(memberAccount, gameUid, creditAmount) {
  const timestamp = Math.round(Date.now())

  const payload = {
    agency_uid: AGENCY_UID,
    member_account: PLAYER_PREFIX + memberAccount,
    game_uid: gameUid,
    credit_amount: creditAmount,
    currency_code: CURRENCY_CODE,
    timestamp: timestamp,
  }

  const encryptedPayload = encryptData(JSON.stringify(payload), AES_KEY)

  const apiResponse = await makeApiRequest(`${SERVER_URL}/game/v1`, {
    agency_uid: AGENCY_UID,
    timestamp: timestamp,
    payload: encryptedPayload,
  })

  if (apiResponse.payload && typeof apiResponse.payload === "string") {
    try {
      apiResponse.payload = JSON.parse(decryptData(apiResponse.payload, AES_KEY))
    } catch (error) {
      console.error("Error decrypting payload:", error)
    }
  }

  return apiResponse
}

export default function GamePortal() {
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const handlePlayGame = async (gameUid) => {
    try {
      setLoading(gameUid)
      setError(null)

      const memberAccount = "Demo"
      const creditAmount = "1000"

      const response = await getGameUrlSeamless(memberAccount, gameUid, creditAmount)

      if (response.payload?.game_launch_url) {
        window.location.href = response.payload.game_launch_url
      } else {
        setError("Failed to get game URL")
        console.error("API Response:", response)
      }
    } catch (err) {
      setError("An error occurred")
      console.error(err)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Game Portal</h1>

        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div
              key={game.uid}
              className="bg-white rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-48 w-full">
                <Image src={game.image || "/placeholder.svg"} alt={game.name} fill className="object-cover" />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold mb-4">{game.name}</h3>
                <button
                  onClick={() => handlePlayGame(game.uid)}
                  disabled={loading === game.uid}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
                >
                  {loading === game.uid ? "Loading..." : "Play Now"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

