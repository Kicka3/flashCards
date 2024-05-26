import { ErrorResponse, Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { MoreVerticalOutline, PlayCircleOutline } from '@/assets/icons/components'
import Edit2Outline from '@/assets/icons/components/Edit2Outline'
import TrashOutline from '@/assets/icons/components/TrashOutline'
import { Button } from '@/common/ui/button'
import { DropdownItem } from '@/common/ui/dropdownMenu/dropdownItem'
import { DropDownMenu } from '@/common/ui/dropdownMenu/dropdownMenu'
import { DropdownSeparator } from '@/common/ui/dropdownMenu/dropdownSeparator'
import { Typography } from '@/common/ui/typography'
import { DeleteForm } from '@/features/deck/deleteForm'
import { UpdateDeck } from '@/features/deck/updateDeck'
import { Deck, useDeleteDeckMutation } from '@/services/decks'

import s from './iconDropdown.module.scss'

type Props = {
  deck: Deck
}

export const IconDropDown = ({ deck }: Props) => {
  const navigate = useNavigate()

  const goBackHandler = () => {
    navigate(-1)
  }
  /** DELETE */
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  const onDeleteDeck = async (id: string) => {
    if (!deck || !deck.id) {
      toast.error('Deck is not defined or its id is missing')

      return
    }

    try {
      if (id) {
        await toast.promise(deleteDeck({ id: deck.id }).unwrap(), {
          pending: 'In progress',
          success: 'Success',
        })
        goBackHandler()
      }
    } catch (e: unknown) {
      const err = e as ErrorResponse

      toast.error(err.data.message ?? "Deck Couldn't Delete")
    }
  }

  const selectItemHandler = (e: Event) => e.preventDefault()

  return (
    <>
      <DropDownMenu
        trigger={
          <Button variant={'icon'}>
            <MoreVerticalOutline height={25} width={25} />
          </Button>
        }
      >
        <DropdownItem asChild>
          <Button as={Link} className={s.link} to={'learn'}>
            <PlayCircleOutline height={'16px'} width={'16px'} />
            <Typography variant={'caption'}>Learn</Typography>
          </Button>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem onSelect={selectItemHandler}>
          <UpdateDeck
            deck={deck}
            trigger={
              <Button as={'div'} className={s.dropDownItem} variant={'link'}>
                <Edit2Outline height={'16px'} width={'16px'} />
                <Typography variant={'caption'}>Edit</Typography>
              </Button>
            }
          />
        </DropdownItem>
        <DropdownSeparator />

        <DropdownItem onSelect={selectItemHandler}>
          <DeleteForm
            id={deck.id}
            name={deck.name}
            onDeleteDeck={onDeleteDeck}
            trigger={
              <Button
                as={'div'}
                className={s.dropDownItem}
                disabled={isDeckBeingDeleted}
                variant={'link'}
              >
                <TrashOutline height={'16px'} width={'16px'} />
                <Typography variant={'caption'}>Delete</Typography>
              </Button>
            }
          />
        </DropdownItem>
      </DropDownMenu>
    </>
  )
}
