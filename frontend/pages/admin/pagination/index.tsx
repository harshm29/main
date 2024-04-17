import * as React from "react";
import Pagination from "@mui/material/Pagination";
// import Link from 'next/link'

// import {MyPage} from '../../../src/components/common/types'

const PaginationComp = ({ count, handleChange }: any) => {
  // const [count, setCount] = React.useState(10);

  const handlePageChange = (e: any, num: any) => {
    handleChange(num);
  };

  return (
    <>
      <div className="pagination_wrapper">
        <div className="pagination">
          {/* <Link href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M11.727 12L12.667 11.06L9.61366 8L12.667 4.94L11.727 4L7.72699 8L11.727 12Z"/>
                <path d="M7.33344 12L8.27344 11.06L5.2201 8L8.27344 4.94L7.33344 4L3.33344 8L7.33344 12Z"/>
                </svg>
            </Link>
            <Link href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10.06 12L11 11.06L7.94667 8L11 4.94L10.06 4L6.06 8L10.06 12Z"/>
                </svg>
            </Link> */}
          {/* <Link href="/" className="active">1</Link>
            <Link href="/">2</Link>
            <Link href="/">3</Link>
            <Link href="/">4</Link>
            <Link href="/">5</Link>
            <Link href="/">6</Link> */}
          <Pagination
            count={count}
            className="pagination"
            onChange={(e: any, num: any) => handlePageChange(e, num)}
          />
          {/* <Link href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6.94 4L6 4.94L9.05333 8L6 11.06L6.94 12L10.94 8L6.94 4Z"/>
                </svg>
            </Link>
            <Link href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M4.27301 4L3.33301 4.94L6.38634 8L3.33301 11.06L4.27301 12L8.27301 8L4.27301 4Z"/>
                <path d="M8.66656 4L7.72656 4.94L10.7799 8L7.72656 11.06L8.66656 12L12.6666 8L8.66656 4Z"/>
                </svg>
            </Link> */}
        </div>
      </div>
    </>
  );
};
export default PaginationComp;
PaginationComp.Layout = "front";
