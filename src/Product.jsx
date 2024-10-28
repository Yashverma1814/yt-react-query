import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";


const Product = () => {

    const params = useParams(); 
    
    const mutation = useMutation({
        mutationFn: (newProduct) => {
            return axios.put(`https://dummyjson.com/products/${params.productId}`,newProduct)
        },
    })
    

    const fetchProduct = async() =>{
        const res = await fetch(`https://dummyjson.com/products/${params.productId}`);
        const data = await res.json()
        return data
    }

    const {isLoading, error, data:product} = useQuery({
        queryKey:['product',params.productId],
        queryFn: fetchProduct,
    })

    if(isLoading){
        return <h1>Loading...</h1>
    }

    if(error){
        return <h2>Error: {error}</h2>
    }

    if(mutation.isLoading){
        return <h1>Updating...</h1>
    }
    
    if(mutation.isError){
        return <h1>Error while updating. {mutation.error.message}</h1>
    }

    return (
        <>
        <div>
            Product:{product.title}
        </div>
        <button
            onClick={()=>{
                mutation.mutate({title:'Updated Product'})
            }}
            >
            Update Product
        </button>
        </>
    );
};

export default Product;
