import React, { useState, useRef } from 'react'
import Draggable from 'react-draggable'
import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'
import { Reservation } from '../component/Reservation'
import { actionCreators as uAc } from '../redux/modules/restaurant'
import { OwnerPermit } from '../shared/OwnerPermit'
import Modal from './Modal'

export const DraggableItem = props => {
  const restaurant = useSelector(state => state.restaurant)
  const [opacity, setOpacity] = useState(0)

  const dispatch = useDispatch()
  const nodeRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const trackPos = data => {
    setPosition({ x: data.x, y: data.y })
  }
  const handleStart = () => {
    setOpacity(0.6)
  }
  const handleEnd = seat => {
    setOpacity(0)
    const seat_info = {
      id: props.id,
      vacancy: props.vacancy,
      posX: position.x.toFixed(),
      posY: position.y.toFixed(),
    }
    dispatch(uAc.updateSeat(seat_info))
  }

  const updateSeat = seat => {
    const seat_info = {
      id: props.id,
      vacancy: !props.vacancy,
      posX: position.x.toFixed(),
      posY: position.y.toFixed(),
    }
    dispatch(uAc.updateSeat(seat_info))
  }

  const removeSeat = () => {
    dispatch(uAc.removeSeat(props.id))
  }

  const [reservationModalVisible, setReservationModalVisible] = useState(false)

  const openReservationModal = () => {
    setReservationModalVisible(true)
  }

  const closeReservationModal = () => {
    setReservationModalVisible(false)
  }

  return (
    <OwnerPermit>
      <Draggable
        disabled={restaurant.info.seat_edit_toggle}
        nodeRef={nodeRef}
        onDrag={(e, data) => trackPos(data)}
        onStart={handleStart}
        onStop={handleEnd}
        defaultPosition={{ x: props.posX, y: props.posY }}
      >
        <Item opacity={opacity}>
          <div onClick={updateSeat} ref={nodeRef}>
            {props.type === 'seat' ? (props.vacancy ? '🍴' : '🍽') : ''}
          </div>
          {props.icon}
          <TableDisplay>{props.type === 'seat' ? props.people + '인석' : ''}</TableDisplay>
          <Client>
            {props.type === 'seat' ? (props.client ? props.client + '님 예약' : '') : ''}
          </Client>
          <HideButtonSet>
            <HideButton>⚙</HideButton>
            <HideButton onClick={removeSeat}>❌</HideButton>
          </HideButtonSet>
        </Item>
      </Draggable>
      <Draggable disabled={true} defaultPosition={{ x: props.posX, y: props.posY }}>
        <ClientItem onClick={openReservationModal}>
          <div>{props.type === 'seat' ? (props.vacancy ? '🍴' : '🍽') : ''}</div>
          {props.people &&
            restaurant.info.seats_rull.find(
              rull => rull.type === 'seat' && rull.id === props.people
            ).icon}
          <TableDisplay>{props.type === 'seat' ? props.people + '인석' : ''}</TableDisplay>
          <Client>{props.type === 'seat' ? (!props.vacancy ? '사용중' : '예약하기') : ''}</Client>
        </ClientItem>
      </Draggable>
      {reservationModalVisible && (
        <Modal
          visible={reservationModalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeReservationModal}
        >
          <Reservation onClose={closeReservationModal} />
        </Modal>
      )}
    </OwnerPermit>
  )
}

const bounce = keyframes`
  0% {
    transform: scale(0)
  }
  100% {
    transform: scale(1)
  }
`

const HideButton = styled.button`
  display: none;
  font-size: 25px;
  width: 50px;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  border: none;
  position: relative;
  right: 55px;
  :nth-child(2) {
    top: 10px;
  }
`

const Item = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  max-width: 50px;
  max-height: 50px;
  pointer-events: auto;
  z-index: 9;
  cursor: pointer;
  border: 4px solid #434224;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  font-size: 30px;
  opacity: ${props => (props.opacity ? '0.6' : '1')};
  :hover {
    font-size: 32px;
    ${HideButton} {
      display: block;
      animation: ${bounce} 1s;
    }
  }
`
const ClientItem = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  max-width: 50px;
  max-height: 50px;
  pointer-events: auto;
  z-index: 9;
  cursor: pointer;
  border: 4px solid #434224;
  border-radius: 50%;
  text-align: center;
  vertical-align: middle;
  font-size: 30px;
  opacity: ${props => (props.opacity ? '0.6' : '1')};
`

const HideButtonSet = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Client = styled.div`
  font-size: 15px;
  border: none;
  border-radius: 50%;
  width: 140px;
  position: absolute;
  left: -48px;
  background-color: rgba(0, 0, 0, 0);
`

const TableDisplay = styled.div`
  font-size: 15px;
`
