import React from 'react';
//import Pagination from 'react-bootstrap/Pagination';

const Paging = ({ totalPage, currentPage, changePageFunc }) => {


    const handleNext = () => {
        let temp = currentPage + 1;
        if (temp <= totalPage) {
            handlePageChange(temp)
        }
    };

    const handlePre = () => {
        let temp = currentPage - 1;
        if (temp >= 1) {
            handlePageChange(temp)
        }
    };

    const handlePageChange = (newPage) => {
        if (changePageFunc) {
            changePageFunc(newPage -1)       
        }
    }

    return (
        <div className="paging">
            {totalPage > 0 ? (
                <div className="paging text-end">
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handlePre}
                        id="btnPre"
                    >
                        Previous
                    </button>
                    {Array.from({ length: totalPage }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => handlePageChange(i + 1)}
                            id={`btn-paging_${i}`}
                            className={
                                currentPage === i + 1
                                    ? "btn btn-danger"
                                    : "btn btn-outline-danger"
                            }
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button
                        id="btnNext"
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Paging;


// return (
//     <Pagination>

//         <Pagination.Prev />
//         <Pagination.Item>{1}</Pagination.Item>
//         <Pagination.Ellipsis />

//         {
//             currentPage- > 1 &&
//             <Pagination.Item>{totalPage}</Pagination.Item>
//         }
//         <Pagination.Item>{10}</Pagination.Item>
//         <Pagination.Item>{11}</Pagination.Item>
//         <Pagination.Item active>{currentPage}</Pagination.Item>
//         <Pagination.Item>{13}</Pagination.Item>
//         <Pagination.Item disabled>{14}</Pagination.Item>

//         <Pagination.Ellipsis />
//         {
//             totalPage > 1 &&
//             <Pagination.Item>{totalPage}</Pagination.Item>
//         }

//         <Pagination.Next />

//     </Pagination>
// );