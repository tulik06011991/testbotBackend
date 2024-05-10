import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const GetQuestions = () => {

    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/test/answer/get');
                setData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Savollarni yuklashda xatolik:', error);
                setMessage('Savollarni yuklashda xatolik yuz berdi');
            }
        };
        fetchQuestions();
    }, []);

    return (
        <div>
            <br /><br /><br /><br />
            <div className="container w-full ml-4">
                <h1 className="mb-8 text-center">Savollar ro'yxati</h1>
                {data.length > 0 ? (
                    <div className="overflow-y-scroll">
                        <table className="text-left w-full">
                            <thead className="bg-black flex text-white w-full">
                                <tr className="flex w-full mb-4">
                                    <th className="p-4 w-2/4">Savol</th>
                                    <th className="p-4 w-1/4">Variantlar</th>
                                    <th className="p-4 w-1/4">To'g'ri javob</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((question, index) => (
                                    <tr key={index} className="flex mb-4 w-full" >
                                        <td className="p-4 w-2/4">{question.title}</td>
                                        <td className="p-4 w-1/4" >
                                            <ul>
                                                {question.options.map((variant, i) => (
                                                    <li key={i}>{variant}</li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="p-4 w-1/4">{question.correctAnswer}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                ) : (
                    <span>Savollar topilmadi</span>
                )}
            </div>
            <button className='d-flex  text-center items-end bg-blue-500 py-2 px-4 ml-12 rounded'><Link to={'/adminpanel'}>Orqaga</Link></button>
        </div>

    );
};

export default GetQuestions;
