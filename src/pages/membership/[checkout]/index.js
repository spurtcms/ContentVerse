import Blog_Header_Component from '@/components/Header/Blog_Header';
import CheckoutPlan from '@/components/Membership_page/checkoutPlan';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Page = () => {
    const router =useRouter()
console.log(router?.query?.checkout,"vhfdg")
const id=router?.query?.checkout
    return (
        <>
       <CheckoutPlan id={id}  />
        </>
    );
};

export default Page;
