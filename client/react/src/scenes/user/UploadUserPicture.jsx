import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ChangePictureContainer, InputFile, InputFileLabel } from './styles'
import { showToastSuccess, showToastError } from 'store/sagas/actions'
import { userChanged } from 'store/actions'
import { imageService } from 'services'

export default function UploadUserPicture() {

  const dispatch = useDispatch()
  const state = useSelector(state => state.appState)

  function imageChanged(e) {

    const files = (e.target || window.event.srcElement).files

    if (files && files.length) {
      imageService.uploadPerfilPicture(files[0])
        .then(res => {
          state.user.picture = `/api/image/${res.fileName}`
          dispatch(userChanged(state.user))
          dispatch(showToastSuccess('Imagem atualizada com sucesso.'))
        })
        .catch(err => dispatch(showToastError(err.message || 'Não foi possível fazer upload da imagem.')))
    }
  }

  return (
    <ChangePictureContainer>
      <img src={state.user.picture || '/api/image/user-image.png'} />
      <div>
        <InputFile type="file" onChange={e => imageChanged(e)} />
        <InputFileLabel>Alterar</InputFileLabel>
      </div>
    </ChangePictureContainer>
  )
}