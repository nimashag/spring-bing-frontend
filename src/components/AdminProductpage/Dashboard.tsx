import React, { useEffect } from 'react';

// Components
import Header from './Header';
import AdminActionBtns from './AdminActionBtns';


// // Redux
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../redux/store'; // Assuming you have a typed dispatch in your store
// import { getCategories } from '../redux/actions/categoryActions';
// import { getProducts } from '../redux/actions/productActions';

const Dashboard: React.FC = () => {

    // const dispatch: AppDispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getCategories());
    // }, [dispatch]);

    // useEffect(() => {
    //     dispatch(getProducts());
    // }, [dispatch]);

    /********************************
     * RENDERER
     ********************************/
    return (
        <section>
            <Header />
            <AdminActionBtns />
            
        </section>
    );
};

export default Dashboard;
