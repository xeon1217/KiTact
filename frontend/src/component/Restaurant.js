import React, { useEffect, useState } from 'react'
import { Button, Grid, Image, Input, Text } from '../elements'
import { Tags } from '../elements/Tags'
import { MenuList } from './MenuList'
import { useDispatch, useSelector } from 'react-redux'

import { Seats } from './Seats'
import { OwnerPermit } from '../shared/OwnerPermit'
import { Combobox } from '../elements/Combobox'
import { PostCode } from '../elements/PostCode'
import Modal from '../elements/Modal'
import { actionCreators as rAc } from '../redux/modules/restaurant'
import { Upload } from '../elements/Upload'

export const Restaurant = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('LOAD')
    dispatch(rAc.loadDB(7))
    return () => {}
  }, [])

  const restaurant = useSelector(state => state.restaurant)
  const preview = useSelector(state => state.image.preview)

  const midium_category = restaurant.info.midium_category.list
    ? restaurant.category.find(category => category.text === restaurant.info.large_category).list
    : ''

  const small_category = midium_category
    ? midium_category.find(category => category.text === restaurant.info.midium_category)
    : ''

  const [postmodalVisible, setpostModalVisible] = useState(false)

  const openPostModal = () => {
    setpostModalVisible(true)
  }

  const closeModal = () => {
    setpostModalVisible(false)
  }

  const [name, setName] = useState('')
  const [img, setImg] = useState('')
  const [tel, setTel] = useState('')
  const [opentime, setOpentime] = useState('')
  const [closetime, setClosetime] = useState('')
  const [holiday, setHoliday] = useState('')
  const [detail, setDetail] = useState('')
  const [owner, setOwner] = useState('')

  const handleChange = (target, value) => {
    switch (target) {
      case 'name':
        setName(value)
        break
      case 'img':
        setImg(value)
        break
      case 'tel':
        setTel(value)
        break
      case 'opentime':
        setOpentime(value)
        break
      case 'closetime':
        setClosetime(value)
        break
      case 'holiday':
        setHoliday(value)
        break
      case 'detail':
        setDetail(value)
        break
      case 'owner':
        setOwner(value)
        break
      default:
        break
    }
    dispatch(rAc.updateInfo({ target: target, value: value }))
  }

  return (
    <OwnerPermit>
      <Grid padding='10px'>
        <Grid is_flex>
          <Combobox
            label='?????????'
            category={restaurant.category}
            selected={restaurant.info.large_category}
            position='large'
          />
          <Combobox
            label='?????????'
            category={midium_category}
            selected={restaurant.info.midium_category}
            position='midium'
          />
          <Combobox
            label='?????????'
            category={small_category ? small_category.list : undefined}
            selected={small_category ? restaurant.info.small_category : ''}
            position='small'
          />
          <Input
            label='????????????'
            value={tel ? tel : restaurant.info.tel}
            _onChange={e => handleChange('tel', e.target.value)}
          />
          <Input
            label='??????'
            value={name ? name : restaurant.info.name}
            _onChange={e => handleChange('name', e.target.value)}
          />
          <Input
            label='?????????'
            value={owner ? owner : restaurant.info.owner}
            _onChange={e => handleChange('owner', e.target.value)}
          />
        </Grid>
        <Grid is_flex padding='10px'>
          <Input
            label='??????'
            value={restaurant.info.address}
            _onClick={openPostModal}
            width='328px'
          />
          <Input
            label='??????'
            value={opentime ? opentime : restaurant.info.opentime}
            _onChange={e => handleChange('opentime', e.target.value)}
            type='time'
          />
          <Input
            label='??????'
            value={closetime ? closetime : restaurant.info.closetime}
            _onChange={e => handleChange('closetime', e.target.value)}
            type='time'
          />
          <Input
            label='??????'
            value={holiday ? holiday : restaurant.info.holiday}
            _onChange={e => handleChange('holiday', e.target.value)}
          />
        </Grid>
        {postmodalVisible && (
          <Modal
            visible={postmodalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
          >
            <PostCode onClose={closeModal} />
          </Modal>
        )}
        <br />
        <Grid>
          <Image shape='rectangle' src={preview ? preview : restaurant.info.img} />
          <Upload />
          <Input
            label='??????????????????'
            width='100%'
            value={detail ? detail : restaurant.info.detail}
            _onChange={e => handleChange('detail', e.target.value)}
          />
        </Grid>
        <Grid is_flex>
          <Tags tags={restaurant.info.tags} />
        </Grid>
        <Grid>
          <Text label='??????'>???? ????????? ??????????????????.</Text>
          <Text label='???????????????'>
            {restaurant.info.total_seat_count}?????? ?????? ??? {restaurant.info.vacancy_count}??????
            ????????? ?????? ?????????
          </Text>
          <Seats />
        </Grid>
        <Grid>
          <MenuList />
        </Grid>
        {/* <Button _onClick={dispatch(rAc.updateDB(restaurant.info.id))}>?????? ??????</Button> */}
      </Grid>
      {/* ?????????UI ================================================================================ ?????????UI */}
      <Grid padding='10px'>
        <Grid is_flex>
          <Text label='?????????'>{restaurant.info.large_category}</Text>
          <Text label='?????????'>{restaurant.info.midium_category}</Text>
          <Text label='?????????'>???? {restaurant.info.small_category}</Text>
          <Text label='??????' size='30px'>
            {restaurant.info.name}
          </Text>
        </Grid>
        <Grid is_flex>
          <Text label='??????'>???? {restaurant.info.address}</Text>
          <Text label='????????????'>???? {restaurant.info.tel}</Text>
          <Text label='????????????'>
            ??? {restaurant.info.opentime + '~' + restaurant.info.closetime}
          </Text>
          <Text label='??????'>???? {restaurant.info.holiday}</Text>
          <Text label='?????????'>?????????: {restaurant.info.owner}</Text>
        </Grid>
        <Image shape='rectangle' src={restaurant.info.img} />
        <Grid>
          <Text label='??????????????????'>???? {restaurant.info.detail}</Text>
        </Grid>
        <Grid is_flex>
          <Tags tags={restaurant.info.tags} />
        </Grid>
        <Grid>
          <Text label='??????'>???? ????????? ??????????????????.</Text>
          <Text label='???????????????'>
            {restaurant.info.total_seat_count}?????? ?????? ??? {restaurant.info.vacancy_count}??????
            ????????? ?????? ?????????
          </Text>
          <Seats />
        </Grid>
        <Grid>
          <MenuList />
        </Grid>
      </Grid>
    </OwnerPermit>
  )
}
