import React, { useEffect, useState } from 'react'
import styles from './ProfileArea.module.css'

import API from '../../Utils/API.tsx';


import DefaultGame from '../../Components/DefaultGame/DefaultGame.tsx';
import Navbar from '../../Components/Navbar/Navbar.tsx';

import { IoIosNotifications, IoIosSettings } from "react-icons/io";
import { FaInstagram } from "react-icons/fa6";
import { CiFileOff, CiFileOn, CiSettings } from "react-icons/ci";
import Settings from '../../Components/Settings/Settings.tsx';
import { IoPerson, IoSendSharp, IoStatsChart } from "react-icons/io5";
import { FaCopy, FaFile, FaUserFriends } from "react-icons/fa";
import { MdHistory, MdManageAccounts, MdOutlineLeaderboard } from "react-icons/md";
import { FaGamepad } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLinkOutline } from "react-icons/io5";
import { CiLink } from "react-icons/ci";
import { FaPeopleArrows } from "react-icons/fa";
import { TiInfoLarge } from "react-icons/ti";
import { CiInstagram } from "react-icons/ci";
import { PiGameControllerFill, PiGameControllerThin } from "react-icons/pi";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { CiPlay1 } from "react-icons/ci";
import LoaderTime from '../../Utils/LoaderTime.tsx';

import { useSession } from '../../States/Session/Session.tsx';
import { useOnlineProvider } from '../../States/Online/Online.tsx';
import { useNavigate } from 'react-router-dom';
import { useBlank } from '../../States/BlankState/BlankState.tsx';
import { PiNumberCircleFourFill } from "react-icons/pi";
import Blank from '../../Components/Blank/Blank.tsx';
import TextIcon from '../../Components/TextIcon/TextIcon.tsx';
import InputIcon from '../../Components/InputIcon/InputIcon.tsx';
import Loader from '../../Components/Loader/Loader.tsx';
import NotificationIndbox from '../../Components/NotificationIndbox/NotificationIndbox.tsx';
import Error from '../../Components/Error/Error.tsx';


export default function ProfileArea() {

    const router = useNavigate()

    const [isNotificationMenu, setIsNotificationMenu] = useState<boolean>(false)

    const { removeOnline } = useOnlineProvider()

    const { isBlank, toggleBlank, enableBlank, disableBlank } = useBlank()

    const [isUserInfo, setIsUserInfo] = useState<boolean>(true)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isSettings, setIsSettings] = useState<boolean>(false)

    const [gender, setGender] = useState<string>('')
    const [instagram, setInstagram] = useState<string>('')
    const [photo, setPhoto] = useState<any>(null);
    const [showPhoto, setShowPhoto] = useState<string>('')
    const [publicId, setPublicId] = useState<string>('')

    const [name, setName] = useState<string>('')
    const [showName, setShowName] = useState<string>('')
    const [finalName, setFinalName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const [instagrams, setInstagrams] = useState<number>(0)
    const [games, setGames] = useState<number>(0)
    const [rizz, setRizz] = useState<number>(0)
    const [rizzLevel, setRizzLevel] = useState<number>(0)

    const [inviteId, setInviteId] = useState<string>('')

    const [error, setError] = useState<string>('')

    const [notificationNumber, setNotificationNumber] = useState<number>(0)

    const [settingProgress, setSettingProgress] = useState<number>(1)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [idRef, setIdRef] = useState<any>()

    useEffect(() => {
        disableBlank()
    }, [])



    useEffect(() => {
        if (!isUserInfo) {
            enableBlank()
        }
        if (isSettings) {
            enableBlank()
        }
        if (isNotificationMenu) {
            enableBlank()
        }
    }, [isUserInfo, isSettings, isNotificationMenu])


    useEffect(() => {
        if (error !== '') {
            setTimeout(() => {
                setError('')
            }, 3500);
        }
    }, [error])

    useEffect(() => {
        if (isPlaying === false) {
            removeOnline()
        }
    }, [isPlaying])


    useEffect(() => {
        const noti = setInterval(() => {
            getNotificationsNumber()
        }, 5000);

        return () => clearInterval(noti)
    }, [])





    const checkUserInfo = async () => {
        try {
            const response = await fetch(API.api + '/checkUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });

            const responseData = await response.json();

            const data = responseData
            //console.log(data)

            if (data.error) {
                setIsSettings(true)
                setSettingProgress(4)
                setError('Please fill every option in order to play !')
            } else {
                setIsUserInfo(true)
                play()
            }

            //console.log(data)

        } catch (error: any) {
            //  console.log(error)
        }
    }

    const getPublicInfo = async (publicId: string) => {
        try {
            const response = await fetch(API.api + '/getPublicData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ publicId })
            });

            const responseData = await response.json();

            const data = responseData

            //console.log(data)

            if (data.error) {
                //LoaderTime.loader(setIsLoading)
            } else {
                setInstagrams(data.instagramCount)
                setGames(data.totalGames)

                setRizz((data.instagramCount / data.totalGames) * 100)
                setRizzLevel((data.instagramCount / data.totalGames) * 100)


            }

            //console.log(data)

        } catch (error: any) {
        }
    }


    const getUserInfo = async () => {
        try {
            const response = await fetch(API.api + '/getUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });

            const responseData = await response.json();

            const data = responseData
            // console.log(data)

            if (data.error) {

                LoaderTime.loader(setIsLoading)
                setPublicId(data.publicId)
                setName(data.name)
                setShowName(data.name)

            } else {
                setGender(data.gender)
                setInstagram(data.instagram)
                setPhoto(data.photo)
                setShowPhoto(data.photo)
                setName(data.name)
                setShowName(data.name)
                setFinalName(data.name)
                setPublicId(data.publicId)

                getPublicInfo(data.publicId)

                LoaderTime.loader(setIsLoading)
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    const getUserMain = async () => {
        try {
            const response = await fetch(API.api + '/getNameEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });

            const responseData = await response.json();

            const data = responseData
            // console.log(data)

            if (data.error) {

            } else {
                setName(data.name)
                setEmail(data.email)
            }
            //console.log(data)

        } catch (error: any) {
        }
    }

    const updateName = async () => {
        try {
            const response = await fetch(API.api + '/updateName', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token'), newName: name })
            });

            const responseData = await response.json();

            const data = responseData
            // console.log(data)

            if (data.error) {
                //  setError(data.error)
                //     setSuccess('')

            } else {
                // setName(data.name)
                //  setError('')
                //    setSuccess('Name wurde erfolgreich aktualisiert')
                //    setSuccessCode(2)
            }
            //console.log(data)

        } catch (error: any) {
        }
    }

    const play = async () => {
        try {
            const response = await fetch(API.api + '/onlineMember', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token'), online_id: localStorage.getItem('online_id') })
            });

            const responseData = await response.json();

            const data = responseData
            //console.log(data)

            if (data.error) {

            } else {
                localStorage.setItem('online_id', data._id)
                setIsPlaying(true)
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    const getNotificationsNumber = async () => {
        try {
            const response = await fetch(API.api + '/notificationsNumber', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });

            const responseData = await response.json();

            const data = responseData
            //   console.log(data)

            if (data.error) {

            } else {
                setNotificationNumber(data.count)
            }

            //console.log(data)

        } catch (error: any) {
        }
    }



    useEffect(() => {
        getNotificationsNumber()
        getUserInfo()
        getUserMain()
    }, [])

    const getRizzLevel = () => {
        if (rizz > 100) {
            return 100;
        } else if (Number.isNaN(rizz)) {
            return 0;
        } else {
            return rizz; // Adjust as needed
        }
    };


    const handleCopyClick = () => {
        navigator.clipboard.writeText(publicId)
        alert('ID Copied')
    }


    const getPhoto = () => {
        if (photo === undefined || photo === null || photo === '') {
            return 'https://birtwistlewiki.com.au/images/d/dd/Unknown.png'
        } else {
            return showPhoto
        }
    }

    const removeNotifications = async () => {
        try {
            const response = await fetch(API.api + '/removeNewNotifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token') })
            });

            const responseData = await response.json();

            const data = responseData
            //   console.log(data)

            if (data.error) {

            } else {
                getNotificationsNumber()
            }

            //console.log(data)

        } catch (error: any) {
        }
    }

    const sendInvite = async (publicId: string) => {
        const ourId = localStorage.getItem('publicId')
        try {
            const response = await fetch(API.api + '/sendInvite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('token'), ourId, publicId })
            });

            const responseData = await response.json();

            const data = responseData
            //   console.log(data)

            if (data.error) {
                setError(data.error)
            } else {
                getNotificationsNumber()
            }

            //console.log(data)

        } catch (error: any) {
        }
    }


    return (
        <>
            <Blank />


            {isLoading && <Loader />}

            {error !== '' && <Error error={error} />}
            {isNotificationMenu && <NotificationIndbox close={() => { toggleBlank(); setIsNotificationMenu(false) }} />}



            {!isLoading &&
                <>
                    {isSettings &&
                        <Settings
                            gender={gender}
                            instagram={instagram}
                            name={name}
                            photoUrl={photo}
                            setGender={setGender}
                            setPhoto={setPhoto}
                            setName={setName}
                            setInstagram={setInstagram}
                            progress={settingProgress}
                            setProgress={setSettingProgress}
                            close={() => { setIsSettings(false); getUserInfo(); toggleBlank() }} />
                    }


                    {!isPlaying &&
                        <>
                            <div className={styles.area} data-aos="zoom-in">

                                <div className={styles.firstcontent}>
                                    <div className={styles.first}>
                                        <div className={styles.mainprofile}>
                                            <img onClick={() => { setIsSettings(true); setSettingProgress(4) }} src={getPhoto()}></img>
                                            <div className={styles.instagrams}>
                                                <div className={styles.instabox}>
                                                    <div className={styles.theinstagrams}>
                                                        <p>{instagrams}</p>
                                                        <AiFillInstagram className={styles.instaicon} />

                                                        <div className={styles.infoinsta}>
                                                            <TiInfoLarge />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className={styles.instabox}>
                                                    <div className={styles.theinstagrams}>
                                                        <p>{games}</p>
                                                        <FaGamepad className={styles.instaicon} />

                                                        <div className={styles.infoinsta}>
                                                            <TiInfoLarge />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.indbox}>
                                                <div className={styles.notline}>
                                                    <div onClick={() => { setIsNotificationMenu(true); removeNotifications() }} className={styles.notificationbox}>
                                                        <IoIosNotifications className={styles.notification} />
                                                        {notificationNumber !== 0 &&
                                                            <div className={styles.notificationnumber}>
                                                                {notificationNumber < 9 && <p>{notificationNumber}</p>}
                                                                {notificationNumber > 9 && <p>9+</p>}
                                                            </div>
                                                        }
                                                    </div>
                                                    <PiGameControllerFill onClick={() => { checkUserInfo() }} className={styles.notification} />
                                                </div>

                                                <div className={styles.notline}>
                                                    <MdHistory onClick={() => { router('/stats/' + localStorage.getItem('publicId') + '/games/1') }} className={styles.notification} />
                                                    <MdManageAccounts onClick={() => { setIsSettings(true); setSettingProgress(1) }} className={styles.notification} />
                                                </div>
                                            </div>

                                        </div>

                                        <div className={styles.xp}>
                                            <h2>{showName}</h2>
                                            <div className={styles.rizz}>
                                                <div style={{ width: getRizzLevel() + '%' }} className={styles.level}></div>
                                                <p>{rizz.toFixed(0)}%/RIZZ</p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className={styles.stats}>
                                        <div onClick={() => { router(`/stats/${localStorage.getItem('publicId')}`) }} className={styles.statbox}>
                                            <MdOutlineLeaderboard className={styles.staticon} />
                                            <p>Leaderboards</p>
                                        </div>

                                        <div onClick={() => { router('/stats/' + localStorage.getItem('publicId')) }} className={styles.statbox}>
                                            <IoStatsChart className={styles.staticon} />
                                            <p>Personal Stats</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.firstcontent}>
                                    <div className={styles.second}>
                                        <CiSettings onClick={() => { setIsSettings(true); setSettingProgress(4) }} className={styles.settingsicon} />
                                        <div className={styles.playarea}>
                                            <h2><span>Street</span>Date</h2>
                                            <TextIcon
                                                borderRadius='0.3em'
                                                title='Play Now'
                                                width='270px'
                                                color='white'
                                                background='linear-gradient(161deg, rgba(99,184,62,1) 41%, rgba(19,145,18,1) 100%)'
                                                height='40px'
                                                iconFontSize='1.5rem'
                                                transition='all 800ms'
                                                onClick={() => { checkUserInfo() }}
                                            >
                                                <CiPlay1 />
                                            </TextIcon>
                                        </div>
                                        <p className={styles.begin}>Start your search for a perfect partner effortlessly now.</p>
                                    </div>

                                    <div className={styles.id}>

                                        <h2>Public ID</h2>

                                        <InputIcon
                                            color='white'
                                            iconFontSize='1.4rem'
                                            height='35px'
                                            borderRadius='0.3em'
                                            titleColor='white'
                                            value={publicId}
                                            disabled={true}
                                            type='text'
                                            isBoxShadow={true}
                                            fontSize='0.95rem'
                                            title='Public ID'
                                            ref={idRef}
                                            background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                            width='350px'
                                        >
                                            <CiFileOn />
                                        </InputIcon>

                                        <TextIcon
                                            borderRadius='0.3em'
                                            title='Copy'
                                            width='130px'
                                            color='white'
                                            background='linear-gradient(100deg, rgba(204,70,247,1) 58%, rgba(241,139,246,1) 100%)'
                                            height='35px'
                                            iconFontSize='1.3rem'
                                            transition='all 800ms'
                                            onClick={() => { handleCopyClick() }}
                                        >
                                            <FaCopy />
                                        </TextIcon>
                                    </div>

                                </div>

                                <div className={styles.firstcontent}>
                                    <div className={styles.third}>
                                        <h2>Select Game Mode</h2>
                                        <div className={styles.gamemodes}>
                                            <div className={`${styles.mode} ${styles.selectedmode}`}>
                                                <FaPeopleArrows style={{ color: 'white' }} className={styles.modeicon} />
                                                <p>2 Persons</p>
                                            </div>

                                            <div onClick={() => { alert('Coming Soon') }} className={styles.mode}>
                                                <FaPersonCirclePlus className={styles.modeicon} />
                                                <p>4 Persons</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.invitefriend}>
                                        <div className={styles.friend}>
                                            <FaUserFriends className={styles.friendicon} />
                                            <h2>Invite a Friend</h2>
                                        </div>

                                        <InputIcon
                                            color='white'
                                            iconFontSize='1.4rem'
                                            height='35px'
                                            borderRadius='0.3em'
                                            titleColor='white'
                                            isBoxShadow={true}
                                            type='text'
                                            fontSize='0.95rem'
                                            title='User Public ID (5d57b7ea-b...)'
                                            background='linear-gradient(90deg, rgba(176,88,242,1) 65%, rgba(197,165,255,1) 100%)'
                                            width='380px'
                                            onInput={(e) => { setInviteId(e.currentTarget.value) }}
                                        >
                                            <IoLinkOutline />
                                        </InputIcon>

                                        <TextIcon
                                            borderRadius='0.3em'
                                            title='Send Invite'
                                            width='170px'
                                            color='white'
                                            background='linear-gradient(100deg, rgba(204,70,247,1) 58%, rgba(241,139,246,1) 100%)'
                                            height='35px'
                                            iconFontSize='1.3rem'
                                            transition='all 800ms'
                                            onClick={() => { alert('Coming Soon') }}
                                        >
                                            <IoSendSharp />
                                        </TextIcon>
                                    </div>
                                </div>
                            </div>
                        </>
                    }






                    {isPlaying && <DefaultGame setIsPlaying={setIsPlaying} />}

                </>
            }


        </>
    )
}
