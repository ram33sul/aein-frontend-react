import React from 'react'

function DislikeIcon({active, theme, width, height}) {

    height = height ?? '20px';
    width = width ?? '20px';
  return (
    <div style={{width, height}}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" fill="white"/>
    <mask id="path-1-inside-1_0_1" fill="white">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M83.3397 68.9979C86.9424 63.2453 89 56.5909 89 49.5C89 27.6848 69.5244 10 45.5 10C21.4756 10 2 27.6848 2 49.5C2 71.3152 21.4756 89 45.5 89C50.288 89 54.8953 88.2976 59.2038 87H97.042L83.3397 68.9979Z"/>
    </mask>
    <path d="M83.3397 68.9979L79.1021 66.3441L77.2668 69.2747L79.3611 72.0262L83.3397 68.9979ZM59.2038 87V82H58.4673L57.762 82.2124L59.2038 87ZM97.042 87V92H107.131L101.021 83.9717L97.042 87ZM84 49.5C84 55.6028 82.2335 61.3441 79.1021 66.3441L87.5773 71.6518C91.6513 65.1466 94 57.5789 94 49.5H84ZM45.5 15C67.2277 15 84 30.8891 84 49.5H94C94 24.4804 71.821 5 45.5 5V15ZM7 49.5C7 30.8891 23.7723 15 45.5 15V5C19.179 5 -3 24.4804 -3 49.5H7ZM45.5 84C23.7723 84 7 68.1109 7 49.5H-3C-3 74.5196 19.179 94 45.5 94V84ZM57.762 82.2124C53.9195 83.3696 49.7978 84 45.5 84V94C50.7782 94 55.8712 93.2255 60.6457 91.7876L57.762 82.2124ZM97.042 82H59.2038V92H97.042V82ZM79.3611 72.0262L93.0634 90.0283L101.021 83.9717L87.3183 65.9696L79.3611 72.0262Z" fill={foregroundColor} mask="url(#path-1-inside-1_0_1)"/>
    </svg>
    </div>
  )
}

export default DislikeIcon;