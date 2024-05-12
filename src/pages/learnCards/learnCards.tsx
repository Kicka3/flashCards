import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useParams } from 'react-router-dom'

import { ArrowBackOutline } from '@/assets/icons/components'
import { Button, Card, ControlledRadioGroup, RadioItem, Typography } from '@/common/ui'
import { useGetDeckByIdQuery, useGetDeckToLearnQuery, useSaveGradeMutation } from '@/services/decks'

import s from './learnCards.module.scss'

const grade = {
  1: 'Did not Know',
  2: 'Forgot',
  3: 'A lot of thought',
  4: 'Confused',
  5: 'Knew the answer',
}

type FormValues = {
  grade: 'A lot of thought' | 'Confused' | 'Did not Know' | 'Forgot' | 'Knew the answer'
}

const findKeyByValue = (obj: { [key: string]: string }, value: string) => {
  for (const key in obj) {
    if (obj[key] === value) {
      return key
    }
  }

  return 1
}

export const LearnCards = () => {
  const { id: deckId } = useParams()

  const { data: cardData } = useGetDeckToLearnQuery({ id: deckId || '', params: undefined })
  const { data: deckData } = useGetDeckByIdQuery(deckId!)
  const [saveGrade] = useSaveGradeMutation()
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { grade: 'Did not Know' },
  })

  const onSumbit = async (data: FormValues) => {
    try {
      if (cardData?.id && deckId) {
        await saveGrade({
          args: { cardId: cardData.id, grade: Number(findKeyByValue(grade, data.grade)) },
          id: deckId,
        })
      }
    } finally {
      setShowAnswer(false)
      reset()
    }
  }

  return (
    <section className={s.wrapper}>
      <Link className={s.backLink} to={'/'}>
        <ArrowBackOutline height={16} width={16} />
        <Typography variant={'body2'}>Back to Decks List</Typography>
      </Link>

      <Card>
        <div className={s.title}>
          <Typography variant={'h1'}>Learn {deckData?.name}</Typography>
        </div>
        <div className={s.questionSection}>
          <Typography className={s.question} variant={'sub1'}>
            Question: <span>{cardData?.question}</span>
          </Typography>
          {cardData?.questionImg && (
            <div className={s.imageWrapper}>
              <img
                alt={'questionImage'}
                className={s.image}
                height={75}
                src={cardData.questionImg}
                width={150}
              />
            </div>
          )}
          <Typography className={s.tryCountText} variant={'body2'}>
            Количество попыток ответов на вопрос: {cardData?.shots}
          </Typography>
        </div>

        {showAnswer && (
          <>
            <div className={s.answerSection}>
              <Typography className={s.answer} variant={'sub1'}>
                Answer: <span>{cardData?.answer}</span>
              </Typography>
              {cardData?.answerImg && (
                <div className={s.imageWrapper}>
                  <img
                    alt={'answerImage'}
                    className={s.image}
                    height={75}
                    src={cardData.answerImg}
                    width={150}
                  />
                </div>
              )}
            </div>
            <form className={s.rateSection} onSubmit={handleSubmit(onSumbit)}>
              <ControlledRadioGroup control={control} name={'grade'}>
                {Object.values(grade).map(i => (
                  <RadioItem key={i} label={i} value={i} />
                ))}
              </ControlledRadioGroup>
              <Button className={s.submitBtn} fullWidth type={'submit'}>
                Next Question
              </Button>
            </form>
          </>
        )}
        {!showAnswer && (
          <Button fullWidth onClick={() => setShowAnswer(true)}>
            Show Answer
          </Button>
        )}
      </Card>
    </section>
  )
}
