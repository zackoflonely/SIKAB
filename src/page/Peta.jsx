import { useEffect, useState } from "react";
import Axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Peta(){
    useEffect(() => {
        getGaleri();
        window.scrollTo(0, 0);
      }, []); 
    const [getKonten,setKonten]= useState([]);
    const getGaleri = async () => {
        const response = await Axios.get("http://localhost:8000/api/getPeta");
        setKonten(response.data);
      };
      const [searchTerm, setSearchTerm] = useState('');
      const navigate = useNavigate();
      
      const handleInputChange = (e) => {
          setSearchTerm(e.target.value);
      };
  
      const handleSearch = async () => {
          try {
              const response = await axios.get('http://localhost:8000/api/search/tempat', {
                  params: {
                      keyword: searchTerm
                  }
              });
              navigate('/search', { state: { results: response.data } });
          } catch (error) {
              console.error("Error!", error);
          }
      };
    return(
        <div className="my-5 lg:my-20 text-left">
            <h1 className="text-4xl lg:text-5xl w-full lg:w-2/4 font-bold text-left">Jelajahi Sebaran Burung di Kalimantan <br/> Dengan Peta Interaktif <br/> Keanekaragaman Hayati Burung</h1>
            <div className='mt-12'>
                <input placeholder='Masukkan Nama tempat yang ingin kamu cari' onChange={handleInputChange} value={searchTerm} type="text" className='border border-md border-black py-1 mr-3 pl-1 w-60 lg:w-96 text-slate-400'/>
                <button  onClick={handleSearch}  className='px-5 py-1 button-search text-white'>Cari</button>
            </div>
            <div className="my-12">
                {getKonten.map((item,idx)=>(
                    <div className="flex flex-col lg:flex-row md:flex-row justify-between w-full mb-12" key={idx}>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h3 className="text-md font-semibold">{item.lokasi}</h3>
                                <h2 className="text-3xl font-bold mb-3">{item.nama_Tempat}</h2>
                                <p>{item.deskripsi}</p>
                            </div>
                            <Link to={`/peta/detail/${item.ID_Tempat}`}>
                                <button className='bg-green-900 w-fit px-4 py-1 rounded-md text-white'>Lihat</button>
                            </Link>
                        </div>
                        <img className="w-96 ml-0 mt-5 lg:mt-0 md:mt-0 lg:ml-40 md:ml-32" src={`/peta/${item.gambar}`} alt="" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Peta;