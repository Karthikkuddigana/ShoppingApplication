import { useEffect ,useState} from "react"

export default function HomePage(){
    const [products,setProducts] = useState([]); 
    useEffect(()=>{fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>{
        console.log(json); 
        setProducts(json); 
    })},[])
    return (
        <>
            {products.map((product)=>(
                <div key={product.id}>
                    {product.title}
                </div>
            ))}
        </>
    )
}