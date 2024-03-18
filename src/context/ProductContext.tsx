
// productContext.ts
import { ProductsProps } from '@/pages';
import { ReactNode, createContext, useContext, useState } from 'react';

interface ProductContextType {
    produtos: ProductsProps[];
    addProduct: (products: ProductsProps[]) => void;
}

interface ChildrenProps{
    children: ReactNode
}

const ProductContext = createContext({} as ProductContextType);

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error('useProductContext must be used within a ProductProvider');
    }
    return context;
}

export const ProductProvider = ({ children } : ChildrenProps) => {
    const [produtos, setProdutos] = useState<ProductsProps[]>([]);

    const addProduct = (products: ProductsProps[]) => {
        setProdutos(state => products);
    }

    return (
        <ProductContext.Provider value={{ produtos, addProduct }}>
            {children}
        </ProductContext.Provider>
    );
};