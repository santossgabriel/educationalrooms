import React from 'react'
import { useSelector } from 'react-redux'

import { ContainerFooter } from './styles'
import { AppTexts } from 'helpers/appTexts'

export default function Footer() {

  const year = new Date().getFullYear()
  const { language } = useSelector(state => state.appState)

  return (
    <>
      <ContainerFooter>
        <span>
          {`@ ${year} ${AppTexts.AppTitle[language]} - educationalrooms@gmail.com`}
        </span>
      </ContainerFooter>
    </>
  )
}