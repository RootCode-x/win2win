"use client"
import Image from "next/image";
import { useEffect, useState } from "react";

import axios from 'axios';

import { api_path } from "@/lib/api_path";
import { useRouter } from 'next/navigation';


export default function Deposit({ session }) {  
    const router = useRouter();


    
    const [gameData, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    
    const fetchData = async (page) => {
    setIsLoading(true);
        try {
            const response = await axios.get(`${api_path}/casino/callback?gameSync=true&page=${page}`);
            const newData = response.data.items;
            setData((prevData) => [...prevData, ...newData]);
            setCurrentPage(page);
            setIsLoading(false);
        } catch (error) {
            setError(error.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
      fetchData(currentPage);
    }, []);


  return (
      <section className="top_matches">
          <div className="container-fluid">
              <div className="row">
                  <div className="col-12 gx-0 gx-sm-4 pt-50">
                    Sync game
                  </div>
              </div>
          </div>
      </section>
  );
}
