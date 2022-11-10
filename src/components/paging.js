import React from 'react';
import {PageItem, Pagination} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const Paging = (props) => {
    const {totalPages, currentPage, dispatch} = props;
    return (
        <Pagination className={"mt-3"}>
            <Pagination.First href={currentPage - 1 > 0 ? '/movies/' + (currentPage - 1).toString() : '/movies'}
                              disabled={currentPage === 1}/>
            {
                getNums(totalPages, currentPage).map(value => {
                    return <PagingItem pageIndex={value} currentPage={currentPage} dispatch={dispatch} key={value}/>
                })
            }
            <Pagination.Last
                href={currentPage + 1 <= totalPages ? '/movies/' + (currentPage + 1).toString() : '/movies'}
                disabled={currentPage === totalPages}/>
        </Pagination>
    );
};

const PagingItem = (props) => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate("/movies/"+props.pageIndex);
    }

    return (
        <PageItem onClick={clickHandler}
                  active={props.currentPage === props.pageIndex}>{props.pageIndex}</PageItem>
    );
}

function getNums(totalPages, currentPage) {
    let nums = [];
    if (currentPage === 1) {
        nums.push(currentPage);
        if (currentPage + 1 < totalPages) {
            nums.push(currentPage + 1);
        }
        if (currentPage + 2 < totalPages) {
            nums.push(currentPage + 2);
        }
        return nums;
    }
    if (currentPage === totalPages) {
        if (currentPage - 2 > 0) {
            nums.push(currentPage - 2);
        }
        if (currentPage - 1 > 0) {
            nums.push(currentPage - 1);
        }
        nums.push(currentPage);
        return nums;
    }
    if (currentPage - 1 > 0) {
        nums.push(currentPage - 1);
    }
    nums.push(currentPage);
    if (currentPage + 1 <= totalPages) {
        nums.push(currentPage + 1);
    }
    return nums;
}

export default Paging;