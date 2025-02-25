import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import Navbar from '../../Components/Navbar/Navbar';

import InputIcon from '../../Components/InputIcon/InputIcon';
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoEnterOutline } from "react-icons/io5";

import API from '../../Utils/API'
import TextIcon from '../../Components/TextIcon/TextIcon';

interface error {
    type: string;
    value: string;
    msg: string;
    path: string;
}

export default function Register() {

    const router = useNavigate()

    const [isName, setIsName] = useState<boolean>(true)
    const [isEmail, setIsEmail] = useState<boolean>(true)
    const [isPassword, setIsPassword] = useState<boolean>(true)
    const [isConfirmPassword, setIsConfirmPassword] = useState<boolean>(true)

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const [errors, setErrors] = useState<Array<error>>()
    const [error, setError] = useState<string>('')


    const register = async () => {
        try {
            const response = await fetch(API.api + '/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password, confirmPassword })
            });

            const responseData = await response.json();

            const data = responseData
            //console.log(data)

            if (data.errors) {
                setErrors(data.errors)
            } else if (data.error) {
                setError(data.error)
                setErrors([])
            } else {
                setErrors([])
                setError('')
                localStorage.setItem('token', data.userId)
                localStorage.setItem('publicId', data.publicId)
                router('/play')
            }

            //console.log(data)

        } catch (error: any) {
            //  console.log(error)
        }
    }


    useEffect(() => {

        setIsName(true)
        setIsEmail(true)
        setIsPassword(true)
        setIsConfirmPassword(true)

        errors?.forEach((error) => {
            if (error.path === 'name') {
                setIsName(false)
            }

            if (error.path === 'email') {
                setIsEmail(false)
            }

            if (error.path === 'password') {
                setIsPassword(false)
            }

            if (error.path === 'confirmPassword') {
                setIsConfirmPassword(false)
            }
        })
    }, [errors])

    return (
        <>
            <div className={styles.register} data-aos="fade-down">

                <h1>Creating an Account</h1>
                <p className={styles.lol}>Register, to explore all features of our app and get started today!</p>

                <div className={styles.box}>

                    <InputIcon
                        background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                        borderRadius='0.3em'
                        color='white'
                        title='Name'
                        width='450px'
                        titleColor='white'
                        height='30px'
                        type='text'
                        onFocus={() => { }}
                        border={isName ? '' : '1px solid red'}
                        onInput={(e: any) => { setName(e.currentTarget.value) }}
                    >
                        <IoPersonSharp />
                    </InputIcon>

                    <InputIcon
                        background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                        borderRadius='0.3em'
                        color='white'
                        title='Email'
                        width='450px'
                        titleColor='white'
                        height='30px'
                        type='Email'
                        onFocus={() => { }}
                        border={isEmail ? '' : '1px solid red'}
                        onInput={(e: any) => { setEmail(e.currentTarget.value) }}
                    >
                        <MdEmail />
                    </InputIcon>


                    <InputIcon
                        background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                        borderRadius='0.3em'
                        color='white'
                        title='Password'
                        width='450px'
                        titleColor='white'
                        height='30px'
                        type='password'
                        onFocus={() => { }}
                        border={isPassword ? '' : '1px solid red'}
                        onInput={(e: any) => { setPassword(e.currentTarget.value) }}
                    >
                        <MdOutlinePassword />
                    </InputIcon>

                    <InputIcon
                        background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                        borderRadius='0.3em'
                        color='white'
                        title='Confirm Password'
                        width='450px'
                        titleColor='white'
                        height='30px'
                        type='password'
                        onFocus={() => { }}
                        border={isConfirmPassword ? '' : '1px solid red'}
                        onInput={(e: any) => { setConfirmPassword(e.currentTarget.value) }}
                    >
                        <MdOutlinePassword />
                    </InputIcon>

                    <div className={styles.already}>
                        <Link className='link' to={'/login'}><p>Already have an account ?</p></Link>
                    </div>


                    <TextIcon
                        borderRadius='0.3em'
                        title='Jetzt registrieren'
                        width='210px'
                        color='white'
                        background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                        boxShadow='5px 5px 10px rgba(0, 0, 0, 0.5)'
                        height='33px'
                        iconFontSize='1.3rem'
                        marginTop='0.5em'
                        transition='all 800ms'
                        onClick={() => { register() }}
                    >
                        <IoEnterOutline />
                    </TextIcon>
                </div>

                <div className={styles.errors}>
                    {errors?.map((error, index) => (
                        <li data-aos="fade-right" key={index}>{error.msg}</li>
                    ))}
                    {error !== '' && <li>{error}</li>}
                </div>
            </div>
        </>
    )
}
