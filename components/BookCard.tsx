import React from 'react'
import Link from 'next/link'
import BookCover from './BookCover'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { Button } from './ui/button'

const BookCard = ({id, title, genre, color, cover, isLoanedBook=false}:Book) => {
  return (
    <li className={cn(isLoanedBook&&"xs:w-52 w-full")}>
      <Link className={cn(isLoanedBook&&"w-full flex flex-col items-center")}  href={`/books/${id}`}>
        <BookCover color={color} cover={cover} />
        <div className={cn('mt-4', !isLoanedBook&&"xs:max-w-40 max-w-28")}>
          <p className='book-title'>{title}</p>
          <p className='book-genre'>{genre}</p>
        </div>
        {
          isLoanedBook&&(
            <div className="mt-3 w-full">
              <div className="book-loaned">
                <Image src={'/icons/calendar.svg'} alt="book" width={18} height={18} className='object-contain' />
                <p className='text-light-100'>11 days left to return</p>
              </div>

              <Button className="book-btn text-2xl text-light-600">Download receipt</Button>

            </div>
          )
        }
      </Link>
    </li>
  )
}

export default BookCard