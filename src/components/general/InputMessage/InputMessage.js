import React, { useState } from 'react'
import styles from './InputMessage.module.css'
import DisplayMessage from '../DisplayMessage/DisplayMessage';
import Loading from '../Loading/Loading';
function InputMessage({onSend}) {

    const [ value, setValue ] = useState('');
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState('');

    const handleSend = () => {
        setLoading(true)
        onSend(value.trim()).then(() => {
            setValue('');
        }).catch(() => {
            setError("Error occured while sending the message!")
        }).finally(() => {
            setLoading(false)
        })
    }

    function SendIcon() {
        return(
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_0_1)">
                <rect width="100" height="100" fill='none'/>
                <path d="M21.7071 91.58L87.239 58.9518C94.6295 55.272 94.6295 44.728 87.239 41.0482L21.7071 8.41999C15.0591 5.10997 7.25 9.94527 7.25 17.3718L7.25 82.6282C7.25 90.0547 15.0591 94.89 21.7071 91.58Z" stroke="var(--foreground-color)" strokeWidth="10" fill={loading ? 'var(--foreground-color)' : 'var(--background-color)'}/>
            </g>
        </svg>
        )
    }
    
  return (
    <div className={styles.container}>
        { error.length ? <DisplayMessage message={error} color='red' onClick={setError('')}/> : <>
        <input value={value} onChange={(e) => setValue(e.target.value)} className={styles.input} spellCheck="false" placeholder='Type here...' />
        { value.trim().length ? 
            loading ?
           <div style={{width: '30px', overflow: 'hidden', position: 'relative', }}><Loading position='absolute' top='0' left='-10px' scale='0.5'/></div> :
        <div className={styles.button} onClick={handleSend} >
            <SendIcon />
        </div> : '' } </> }
    </div>
  )
}

export default InputMessage