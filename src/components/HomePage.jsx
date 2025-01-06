import { useEffect ,useState,memo} from "react"; 
import Button from "react-bootstrap/Button";
import Nav from 'react-bootstrap/Nav'; 

export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [prodCount,setProdCount]=useState({}); 
    const [totalItems, setTotalItems] = useState();
    useEffect(()=>{
        let totalCount=0; 
        for(let id in prodCount){
            totalCount+=prodCount[id]; 
        }
        console.log(totalCount); 
        setTotalItems(totalCount); 
    },[prodCount]); 
    console.log("component rendered"); 
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => {
                console.log("Fetched products:", json);
                setLoading(false);
                setProducts(json);
                for(let prod of json){
                    setProdCount((prev)=>{console.log({...prev,[prod.id]:0}); return {...prev,[prod.id]:0}; })
                }
                console.log(prodCount); 
            });
    },[]);

    const ItemCard=memo(function ItemCard({ product, id,prodCount,setProdCount }){
        const [count, setCount] = useState(0);
        // console.log(prodCount[id]); 
        function DisplayAddDelete({ prodCount,setProdCount ,id}) {
            const deleteHandle = () => {
                setProdCount((prev)=>{
                    console.log(prev,id,prev[id]); 
                    let temp=prev[id]-11;
    
                    console.log({...prev,[id]:temp},temp); 
                    return {...prev,[id]:temp} 
                })
            };

            const addHandle = () => {
                console.log("Adding item. Current count:", count);
                setProdCount((prev)=>{
                    console.log(prev,id,prev[id]); 
                    let temp=prev[id]+1;
    
                    console.log({...prev,[id]:temp},temp); 
                    return {...prev,[id]:temp} 
                })
            };

            return (
                <>
                    <div>
                        <button onClick={deleteHandle}>-</button>
                        <span>{prodCount[id]}</span>
                        <button onClick={addHandle}>+</button>
                    </div>
                </>
            );
        }; 

        const handleAddItem = () => {
            console.log("Adding item from main button. Current count:", count);
            setCount((myCount) => {
                const newCount = myCount + 1;
                console.log("New count after main button click:", newCount);
                // setTotalItems((prevTotal) => prevTotal + 1); // Update total items
                return newCount;
            });
            setProdCount((prev)=>{
                console.log(prev,id,prev[id]); 
                let temp=prev[id]+1;

                console.log({...prev,[id]:temp},temp); 
                return {...prev,[id]:temp} 
            })
        };

        return (
            <div>
                <div>
                    <div><img src={product.image} alt="" style={{ width: 300, height: "auto" }} /></div>
                    <div>{product.title}</div>
                </div>
                <div>
                    {prodCount[id] > 0 ? (
                        <DisplayAddDelete setProdCount={setProdCount} prodCount={prodCount} id={id}/>
                    ) : (
                        <Button onClick={handleAddItem}>Add to Cart</Button>
                    )}
                </div>
            </div>
        );
    })

    return (
        <>
            <Nav variant="pills" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Cart</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <div>Cart Count: {totalItems}</div>
                </Nav.Item>
            </Nav>
            {isLoading && <div>Loading....</div>}
            {!isLoading && (
                <div style={{ display: "flex" }}>
                    <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "repeat(2, 1fr)" }}>
                        {products.map((product) => (
                            <ItemCard key={product.id} product={product} id={product.id} setTotalItems={setTotalItems} prodCount={prodCount} setProdCount={setProdCount} />
                        ))}
                    </div>
                    <div>
                        Total Cart Count: {totalItems}
                    </div>
                </div>
            )}
        </>
    );
}
