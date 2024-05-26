import { ErrorResponse } from 'react-router-dom'
import { toast } from 'react-toastify'

import { paginationOptions } from '@/common/constants'
import { useSearch } from '@/common/hooks/useSearch'
import { Loader } from '@/common/ui/loader/loader'
import { Pagination } from '@/common/ui/pagination'
import { Typography } from '@/common/ui/typography'
import { DeckHeader } from '@/pages/decks/ui/deckHeader'
import { DecksTable } from '@/pages/decks/ui/deckTable/decksTable'
import { useMeQuery } from '@/services/auth'
import { useDeleteDeckMutation, useGetDecksQuery } from '@/services/decks/decks.service'

import s from './decks.module.scss'

export const DecksContainer = () => {
  const {
    clearFilter,
    currentPage,
    currentTab,
    debouncedSearch,
    itemsPerPage,
    maxCards,
    minCards,
    onChangeItemsPerPage,
    onChangeOrderBy,
    onChangePage,
    onChangeSearchField,
    onCommitSliderValues,
    onTabValueChange,
    orderBy,
    searchField,
  } = useSearch()
  const { data: me } = useMeQuery()

  const {
    data: deckData,
    isFetching: deckIsFetching,
    isLoading: deckIsLoading,
  } = useGetDecksQuery({
    authorId: currentTab === 'userCards' ? me?.id : undefined,
    currentPage,
    itemsPerPage: itemsPerPage,
    maxCardsCount: maxCards,
    minCardsCount: minCards,
    name: debouncedSearch,
    orderBy: orderBy,
  })

  /** Tabs Вынести в отдельный файл для констант?? */
  const tabs = [
    { title: 'My Cards', value: 'userCards' },
    { title: 'All Cards', value: 'allCards' },
  ]

  /** DELETE */
  const [deleteDeck, { isLoading: isDeckBeingDeleted }] = useDeleteDeckMutation()

  if (deckIsLoading) {
    return (
      <h1 className={s.loaderWrapper}>
        <Loader />
      </h1>
    )
  }

  /** Delete Deck */
  const onDeleteDeck = async (id: string) => {
    try {
      await toast.promise(deleteDeck({ id }).unwrap(), {
        pending: 'In progress',
        success: 'Deck was deleted',
      })
    } catch (e: unknown) {
      const err = e as ErrorResponse

      toast.error(err?.data?.errorMessages[0]?.message ?? "Couldn't Delete")
    }
  }

  /** Pagination */
  const totalItems = deckData?.pagination.totalItems || 0
  const moreThanOnePage = totalItems / Number(itemsPerPage) > 1

  return (
    <>
      <DeckHeader
        clearFilter={clearFilter}
        currentTab={currentTab}
        deckIsFetching={deckIsFetching}
        maxCards={maxCards}
        minCards={minCards}
        onChangeSearchField={onChangeSearchField}
        onCommitSliderValues={onCommitSliderValues}
        onTabValueChange={onTabValueChange}
        searchField={searchField}
        tabs={tabs}
      />
      {deckData?.items.length ? (
        <DecksTable
          decks={deckData.items}
          isDeckBeingDeleted={isDeckBeingDeleted}
          onChangeOrderBy={onChangeOrderBy}
          onDeleteDeck={onDeleteDeck}
          orderBy={orderBy}
        />
      ) : (
        <Typography variant={'sub1'}>Content is not found...</Typography>
      )}
      {moreThanOnePage && (
        <Pagination
          className={s.pagination}
          currentPage={currentPage}
          defaultValue={paginationOptions[0]}
          itemsPerPage={Number(itemsPerPage)}
          onChangeItemsPerPage={onChangeItemsPerPage}
          onChangePage={onChangePage}
          options={paginationOptions}
          totalCount={totalItems || 0}
        />
      )}
    </>
  )
}
