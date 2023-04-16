import React from 'react'

function LikeIcon({height, width, active}) {

    height = height ?? '20px';
    width = width ?? '20px';
    const foregroundColor = 'var(--foreground-color)';
    const backgroundColor = 'var(--background-color)';
  return (
    <div style={{width, height}}>
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_0_1)">
    <rect width="100" height="100" fill="white"/>
    <mask id="path-1-inside-1_0_1" fill="white">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M50.1344 93.6344L50.3112 93.8112L88.3182 55.8042L88.1414 55.6274L91.9421 51.8267C102.437 41.3314 102.437 24.3151 91.9421 13.8197C81.4468 3.32439 64.4304 3.32439 53.9351 13.8197L50.1344 17.6204L46.5105 13.9965C36.0151 3.50117 18.9988 3.50117 8.50349 13.9965C-1.99185 24.4918 -1.99185 41.5082 8.50349 52.0035L12.1274 55.6274L50.1344 93.6344Z"/>
    </mask>
    <path d="M50.3112 93.8112L46.7756 97.3467L50.3112 100.882L53.8467 97.3467L50.3112 93.8112ZM88.3182 55.8042L91.8537 59.3397L95.3892 55.8042L91.8537 52.2687L88.3182 55.8042ZM88.1414 55.6274L84.6059 52.0919L81.0703 55.6274L84.6059 59.163L88.1414 55.6274ZM50.1344 17.6204L46.5989 21.156L50.1344 24.6915L53.6699 21.156L50.1344 17.6204ZM53.8467 90.2756L53.6699 90.0989L46.5989 97.1699L46.7756 97.3467L53.8467 90.2756ZM84.7826 52.2687L46.7756 90.2756L53.8467 97.3467L91.8537 59.3397L84.7826 52.2687ZM84.6059 59.163L84.7826 59.3397L91.8537 52.2687L91.6769 52.0919L84.6059 59.163ZM88.4066 48.2912L84.6059 52.0919L91.6769 59.163L95.4776 55.3623L88.4066 48.2912ZM88.4066 17.3553C96.9493 25.898 96.9493 39.7485 88.4066 48.2912L95.4776 55.3623C107.926 42.9143 107.926 22.7322 95.4776 10.2842L88.4066 17.3553ZM57.4706 17.3553C66.0134 8.81254 79.8638 8.81254 88.4066 17.3553L95.4776 10.2842C83.0297 -2.16377 62.8475 -2.16377 50.3996 10.2842L57.4706 17.3553ZM53.6699 21.156L57.4706 17.3553L50.3996 10.2842L46.5989 14.0849L53.6699 21.156ZM42.9749 17.532L46.5989 21.156L53.6699 14.0849L50.046 10.461L42.9749 17.532ZM12.039 17.532C20.5817 8.98932 34.4322 8.98932 42.9749 17.532L50.046 10.461C37.5981 -1.98699 17.4159 -1.98699 4.96796 10.461L12.039 17.532ZM12.039 48.468C3.49631 39.9252 3.49631 26.0748 12.039 17.532L4.96796 10.461C-7.48 22.9089 -7.48 43.0911 4.96796 55.539L12.039 48.468ZM15.663 52.0919L12.039 48.468L4.96796 55.539L8.59188 59.163L15.663 52.0919ZM53.6699 90.0989L15.663 52.0919L8.59188 59.163L46.5989 97.1699L53.6699 90.0989Z" fill={foregroundColor} mask="url(#path-1-inside-1_0_1)"/>
    </g>
    </svg>
    </div>
  )
}

export default LikeIcon;