"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from 'axios';
import { api_path } from "@/lib/api_path";
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';

export default function ExchangeHistory({ session }) {  

  const router = useRouter();
  const [loading, setLoading] = useState(true); 
  const [userDetails, setuserDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [gameData, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchDataxxx = async (page) => {
    setIsLoading(true);
      const response = await axios.get(`${api_path}/exchange/history?exchangeHistory=true&&player_id=${session.user.user_id}`, {
        next: { revalidate: 3600 }, 
      });

      const newData = response.data;
      setData((prevData) => [...prevData, ...newData]);
      setCurrentPage(page);
      setIsLoading(false);
  };

  const fetchData = async (page) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${api_path}/exchange/history`, {
        params: {
          exchangeHistory: true,
          player_id: session.user.user_id,
          page,
          limit: 10,
          startDate: startDate || undefined,
          endDate: endDate || undefined,
        },
      });
  
      const { data, totalPages } = response.data;
      setData((prevData) => [...prevData, ...data]);
      setCurrentPage(page);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  
  useEffect(() => {
    fetchData(1);
  }, [startDate, endDate]);


 // Function to format the date
const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
    };

    const timeString = date.toLocaleString('en-US', options);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(-2);

    return `${timeString.toLowerCase()} ${day}/${month}/${year}`;
};

   return (
    <section className="">
      <Toaster />
      <div className="">
        <div className="row">
          <div className="col-12 gx-0 gx-sm-4">
            <div className="pt-15">
              <div className="row p-5 ">
                <div className="col-12">
                  <div className="pay_method__tabletwo">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '5px 10px',
                        border: '2px solid #080F25',
                        width:'100%',
                    }}>
                    <span style={{ color: 'white', fontWeight: '900' }}>
                        <h4>Exchange History</h4>
                    </span>
                    <span style={{ color: 'white', fontWeight: '900' }}> 
                        <Link   style={{ textAlign: 'right', float:'right' }} href="/bet-list"  className="py-2 px-3  p1-color  y2-bg  rounded-2 ">Bet History</Link>
                    </span>
                </div>

                 <div style={{ marginBottom: '10px', display: 'flex', gap: '10px' }}>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="form-control"
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="form-control"
                    />
                    {/* <button onClick={handleSearch} className="btn btn-primary">
                      Search
                    </button> */}
                  </div>
                  
                    <div style={{ overflowX: 'auto' }} className="pay_method__table-scrollbar">
                      <table className="w-100 text-center p2-bg">
                        <thead>
                          <tr>
                            <th className="text-nowrap">Date</th>
                            <th className="text-nowrap">Bet Amount</th>
                            <th className="text-nowrap">Win/Loss</th>
                            <th className="text-nowrap">Sports Name</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gameData.length > 0 ? (
                            gameData.map((item, index) => (
                              <tr key={index}>
                                <td className="text-nowrap">{formatDate(item.createdAt)}</td>
                                <td className="text-nowrap">{item.amount}</td>
                                <td className="text-nowrap">{item.status}</td>
                                <td className="text-nowrap">{item.sport_name}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4">Nothing found..</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="pagination-controls">
                      {isLoading ? (
                        <p>Loading...</p>
                      ) : (
                        <button
                          onClick={() => fetchData(currentPage + 1)}
                          disabled={isLoading}
                          className="btn btn-primary"
                        >
                          Load More
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  

}
