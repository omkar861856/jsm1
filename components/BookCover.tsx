import React from 'react'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import BookCoverSvg from './BookCoverSvg';

type BookCoverVariant = 'extraSmall' | 'small' | 'medium' | 'regular' | 'wide';

const variantStyles: Record<BookCoverVariant, string> = {
    extraSmall: 'book-cover_extra_small',
    small: 'book-cover_small',
    medium: 'book-cover_medium',
    regular: 'book-cover_regular',
    wide: 'book-cover_wide',
}

interface Props{
    className?: string;
    variant?: BookCoverVariant;
    color:string;
    cover:string;
}

const BookCover = ({className, variant ="regular", color, cover}:Props) => {
  return (
    <div className={cn("relative transition-all duration-300", variantStyles[variant],className)}>

        <BookCoverSvg color={color} />

        <div className="absolute z-10" style={{left:"12%", width:"87.5%", height:"88%"}}>

            <Image className='rounded-sm object-fill' src={cover} alt="book-cover" fill/>

        </div>


    </div>
  )
}

export default BookCover