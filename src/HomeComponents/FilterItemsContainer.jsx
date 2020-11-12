import React from 'react';
import { Menu, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { sortByPrice } from '../Actions/itemsActions'


const FilterItemsContainer = (props) => {

    const handleAllPrice = (event) => {
        props.sortByPrice(event.target.value)
    }


    return (
        <div className="filter-container">
            <Menu text vertical>
                <Menu.Item header>PRICE</Menu.Item>
                <Form>
                    <div className="sort-by-input">
                        <Form.Input
                            className="sort-input-field"
                            checked={props.sortValue === "All"} 
                            type="radio"
                            name="All"
                            value="All"
                            onChange={handleAllPrice} 
                        />
                        <label className="sort-label-tag">All</label>
                    </div>
                </Form>
                <Form>
                    <div className="sort-by-input">
                        <Form.Input
                            className="sort-input-field"
                            checked={props.sortValue === "lowPrice"} 
                            type="radio"
                            name="lowPrice"
                            value="lowPrice"
                            onClick={handleAllPrice} 
                            />
                        <label className="sort-label-tag">Low to High</label>
                    </div>
                </Form>
                <Form>
                    <div className="sort-by-input">
                        <Form.Input
                            className="sort-input-field"
                            checked={props.sortValue === "highPrice"} 
                            type="radio"
                            name="highPrice"
                            value="highPrice"
                            onChange={handleAllPrice} 
                        />
                        <label className="sort-label-tag">High to Low</label>
                    </div>
                </Form>
            </Menu>
        </div>
    );
};


const mapStateToProps = (state) => {
    return{
        items: state.items,
        sortValue: state.items.sortValue
    }
}

export default connect(mapStateToProps, { sortByPrice })(FilterItemsContainer);

{/* <div className="color-labels">               
    <div>
    <a class="huge ui red empty circular label"></a>
    </div>
    <div>
    <a class="huge ui orange empty circular label"></a>
    </div>
    <div>
    <a class="huge ui yellow empty circular label"></a>
    </div>
    <div>
    <a class="huge ui olive empty circular label"></a>
    </div>
    <div>
    <a class="huge ui green empty circular label"></a>
    </div>
    <div>
    <a class="huge ui teal empty circular label"></a>
    </div>
    <div>
    <a class="huge ui blue empty circular label"></a>
    </div>
    <div>
    <a class="huge ui violet empty circular label"></a>
    </div>
    <div>
    <a class="huge ui purple empty circular label"></a>
    </div>
    <div>
    <a class="huge ui pink empty circular label"></a>
    </div>
    <div>
    <a class="huge ui brown empty circular label"></a>
    </div>
    <div>
    <a class="huge ui grey empty circular label"></a>
    </div>
    <div>
    <a class="huge ui black empty circular label"></a>
    </div>
</div>  */}