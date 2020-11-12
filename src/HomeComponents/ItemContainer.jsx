import React from 'react';
import ItemCard from './ItemCard'
import { connect } from 'react-redux'
import { Card } from 'semantic-ui-react'

// import {Link} from 'react-router-dom'


const ItemContainer = (props) => {

    const filterSearch = () => {
        let newArr = props.items.filter(item => {
            let newSearchValue = props.searchItem.toLowerCase()
            return item.title.toLowerCase().includes(newSearchValue)
        })
        return newArr
    }


    const sortByPrice = () => {

        if(props.sortValue === "highPrice"){
            let sortHighItems = props.items.sort((item1, item2) => item2.price - item1.price)
            return sortHighItems}

        else if(props.sortValue === "lowPrice"){
            let sortLowItems = props.items.sort((item1, item2) => item1.price - item2.price)
            return sortLowItems}
            
        else if(props.sortValue === "All"){
            return props.items.sort(() => { return 0.5 - Math.random() })}

    }

    // const sortByLabel = () => {

    //     let filterCategories = ["Casual", "Athletic", "Dress", "Hiking", "Compression", "Pack", "Pride"]
    //     let colorCategories = ["Red", "Orange", "Yellow", "Olive", "Green", "Teal", "Blue", "Violet", "Purple", "Pink", "Brown", "White", "Grey", "Black", "Multicolor"]
    //     let colorbCategories = ["Red", "Orange", "Yellow", "Olive", "Green", "Teal", "Blue", "Violet", "Purple", "Pink", "Brown", "White", "Grey", "Black", "Multicolor"]
    //     let {title, id, color, colorb, category, price, ...props} = this.props.items
    //     let term = this.props.term.term

    //     if(props.sortValue === "highPrice"){
    //         let sortHighItems = props.items.sort((item1, item2) => item2.price - item1.price)
    //         return sortHighItems}

    //     else if(props.sortValue === "lowPrice"){
    //         let sortLowItems = props.items.sort((item1, item2) => item1.price - item2.price)
    //         return sortLowItems}

    //     else if(props.sortValue === "All"){
    //         return props.items.sort(() => { return 0.5 - Math.random() })}

    //     else if(filterCategories.includes(term)){
    //         return this.items.filter(item => item.category === term)}

    //     else if(colorCategories.includes(term)){
    //         return this.items.filter(item => item.color === term)}

    //     else if(colorbCategories.includes(term)){
    //         return this.items.filter(item => item.colorb === term)}
    // }



    return(

        <Card.Group className="all-items-container">
            {/* {filterSearch(sortByLabel()).map(item => <ItemCard key={item.id} item={item} />)} */}
            {filterSearch(sortByPrice()).map(item => <ItemCard key={item.id} item={item} />)}
        </Card.Group>
    );
};


const mapStateToProps = (state) => {
    return {
        items: state.items.allItems,
        searchItem: state.items.search,
        sortValue: state.items.sortValue
    }
}


export default connect(mapStateToProps)(ItemContainer);

// const ItemContainer = (props) => {
//     const filterSearch = () => {
//         let newArr = props.items.filter(item => {
//             let newSearchValue = props.searchItem.toLowerCase()
//             return item.title.toLowerCase().includes(newSearchValue)
//         })
//         return newArr
//     }


//     const sortByLabel = (term) => {

//         let filterCategories = ["Casual", "Athletic", "Dress", "Hiking", "Compression", "Pack", "Pride"]
//         let colorCategories = ["Red", "Orange", "Yellow", "Olive", "Green", "Teal", "Blue", "Violet", "Purple", "Pink", "Brown", "White", "Grey", "Black", "Multicolor"]
//         let colorbCategories = ["Red", "Orange", "Yellow", "Olive", "Green", "Teal", "Blue", "Violet", "Purple", "Pink", "Brown", "White", "Grey", "Black", "Multicolor"]
//         let {title, id, color, colorb, category, price, ...props} = this.props.items
//         let term = this.props.term.term

//         if(props.sortValue === "highPrice"){
//             let sortHighItems = props.items.sort((item1, item2) => item2.price - item1.price)
//             return sortHighItems}

//         else if(props.sortValue === "lowPrice"){
//             let sortLowItems = props.items.sort((item1, item2) => item1.price - item2.price)
//             return sortLowItems}

//         else if(props.sortValue === "All"){
//             return props.items.sort(() => { return 0.5 - Math.random() })}

//         else if(filterCategories.includes(term)){
//             return this.items.filter(item => item.category === term)}

//         else if(colorCategories.includes(term)){
//             return this.items.filter(item => item.color === term)}

//         else if(colorbCategories.includes(term)){
//             return this.items.filter(item => item.colorb === term)}
//     }
//     return(

//         <Card.Group className="all-items-container">
//             {filterSearch(sortByLabel()).map(item => <ItemCard key={item.id} item={item} />)}
//         </Card.Group>
//     );
// };

// filterByCategory = (term) => {
//     return this.props.items.filter(item => item.category === term).map(item =>
//         <Link key={item.id} to={`/items/${item.id}`}><ItemCard key={item.id} item={item} /></Link>)
// }

// filterByHeight = (term) => {
//     return this.props.items.filter(item => item.height === term).map(item =>
//         <Link key={item.id} to={`/items/${item.id}`}><ItemCard key={item.id} item={item} /></Link>)
// }