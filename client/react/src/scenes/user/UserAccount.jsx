import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import useForm from 'react-hook-form'

import {
  Button,
  CircularProgress,
  Checkbox
} from '@material-ui/core'

import { InputHookForm } from 'components'
import { SAGA_SHOW_TOAST_ERROR, SAGA_SHOW_TOAST_SUCCESS } from 'store/sagas/actions'
import { authService } from 'services'
import CardMain from 'components/main/CardMain'
import { AppTexts } from 'helpers/appTexts'
import { FormContainer } from './styles'
import UploadUserPicture from './UploadUserPicture'

const Texts = AppTexts.UserAccount

export default function UserAccount() {

  const [loading, setLoading] = useState(false)

  const appState = useSelector(state => state.appState)

  const { register, watch, handleSubmit, errors, getValues } = useForm()

  const watchChangePassword = watch('changePassword', false)

  const dispatch = useDispatch()

  function onSubmit(form) {
    if (!loading) {
      setLoading(true)
      authService.updateAccount(form)
        .then(({ message }) => {
          setLoading(false)
          dispatch({ type: SAGA_SHOW_TOAST_SUCCESS, payload: message })
        })
        .catch(({ message }) => {
          setLoading(false)
          dispatch({ type: SAGA_SHOW_TOAST_ERROR, payload: message })
        })
    }
  }

  return (
    <CardMain title={Texts.Title[appState.language]}>
      <FormContainer expanded={watchChangePassword} onSubmit={handleSubmit(onSubmit)}>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <InputHookForm
              register={register}
              defa
              validateProps={{ required: true, minLength: 3 }}
              name="name"
              label={Texts.Name[appState.language]}
              variant="outlined"
              defaultValue={appState.user.name}
              errors={errors} />

            <br />

            <InputHookForm
              register={register}
              validateProps={{ required: true }}
              name="email"
              label="Email"
              email
              defaultValue={appState.user.email}
              variant="outlined"
              errors={errors} />

            <div>
              <Checkbox
                color="primary"
                name="changePassword"
                inputRef={register} />
              <span style={{ fontSize: '12px', fontFamily: 'Arial' }}>
                {Texts.ChangePassword[appState.language]}
              </span>
            </div>

            {watchChangePassword &&
              <>
                <br />

                <InputHookForm
                  register={register}
                  validateProps={{ required: true, minLength: 4 }}
                  name="currentPassword"
                  label={Texts.CurrentPassword[appState.language]}
                  variant="outlined"
                  type="password"
                  errors={errors} />

                <br />

                <InputHookForm
                  register={register}
                  validateProps={{ required: true, minLength: 4 }}
                  name="newPassword"
                  label={Texts.NewPassword[appState.language]}
                  variant="outlined"
                  type="password"
                  errors={errors} />

                <br />

                <InputHookForm
                  register={register}
                  validateProps={{
                    required: true,
                    minLength: 4,
                    validate: val => val === getValues().newPassword
                  }}
                  validateError={AppTexts.FormError.PasswordNotMatch[appState.language]}
                  name="confirmPassword"
                  label={Texts.ConfirmPassword[appState.language]}
                  variant="outlined"
                  type="password"
                  validateEquals="teste"
                  errors={errors} />
              </>
            }


          </div>

          <UploadUserPicture />

        </div>

        <div style={{ marginBottom: '20px' }} hidden={!loading}>
          <CircularProgress />
        </div>
        <Button
          variant="contained"
          type="submit"
          color="primary">{AppTexts.Root.Save[appState.language]}</Button>

      </FormContainer>
    </CardMain>
  )
}