import React from 'react'
import styles from '../QuestionBox.module.css'

interface QuestionProps {
    gameProgress: number;
    isFirst: boolean;
    partnerUsername: string;
    question: string;
    answer: string;
    isGameReview?: string;
    from?: string;
    writeQuestion: (value: string) => void;
    writeAnswer: (value: string) => void;

    firstNum: number;
    secondNum: number;
    lastNum: number;

}

export default function QuestionBox({ isGameReview, from, gameProgress, isFirst, writeQuestion, writeAnswer, partnerUsername, answer, question, firstNum, secondNum, lastNum }: QuestionProps) {

    const returnFrom = () => {
        if(isGameReview === '1') {
            return from;
        } else {
            return ''
        }
    }

    const returnFragt = () => {
        if(isGameReview === '1') {
            return 'fragt:'
        } else {
            return ''
        }
    }

    const returnSagt = () => {
        if(isGameReview === '1') {
            return 'sagt:'
        } else {
            return ''
        }
    }

    return (
        <div className={styles.questionbox}>

            <div className={styles.thequestion}>
                {gameProgress === firstNum && isFirst &&
                    <input  spellCheck={false} autoComplete='off' onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            writeQuestion(e.currentTarget.value)
                        }
                    }}  className={`${styles.question}`} placeholder='Schreibe deine Frage auf'></input>
                }
                {gameProgress > firstNum && question !== '' &&
                    <div className={styles.finalquestion} >
                        <p><span style={{ textDecoration: 'underline', fontWeight: '800' }}>{!isFirst ? `${partnerUsername}` : `${returnFrom()}`}</span> {!isFirst ? 'fragt:' : returnFragt()} {question}</p>
                    </div>
                }
            </div>

            <div className={styles.theanswer}>
                {!isFirst && gameProgress === secondNum && <input spellCheck={false} autoComplete='off' onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        writeAnswer(e.currentTarget.value)
                    }
                }} className={styles.answer} placeholder='Schreibe deine Antwort auf'></input>
                }
                {gameProgress > lastNum && answer !== '' &&
                    <div className={styles.finalanswer} >
                        <p><span style={{ textDecoration: 'underline', fontWeight: '800' }}>{isFirst ? `${partnerUsername}` : `${returnFrom()}`}</span> {isFirst ? 'sagt:' : returnSagt()} {answer}</p>
                    </div>
                }
            </div>
        </div>
    )
}
