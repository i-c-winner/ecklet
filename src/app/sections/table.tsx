import React from 'react';
import {Header} from '../../components/header/Header';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Dialog, DialogTitle, DialogContent, Stack, DialogActions, Button, Input } from '@mui/material';

function createData(
  name: string,
  time: number,
  price: number,
  allPrice: number,
) {
  return { name, time, price, allPrice};
}

const rows = [
  createData('1. Маркентиговое заключение и финансовая модель ', 159, 6.0, 24),
  createData('2. ТЗ на проектирование', 237, 9.0, 37),
  createData('3. Актуализация про проекта', 262, 16.0, 24),
  createData('Итого по проекту', 305, 3.7, 67),
];
function TablePage() {

  const refText = React.useRef<HTMLTableCellElement>(null);
  const [fontSize, setFontSize] = React.useState(12);
  const [fontColor, setFontColor] = React.useState('initial');
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState('');
  const [currentelement, setCurrentElement] = React.useState<HTMLTableCellElement | null>(null);
  const [currentValue, setCurrentValue] = React.useState('это можно изменить');
  function handleClose() {
    setOpen(false);
  }
  function changeValue(e: any) {
    currentelement.style.fontSize = fontSize + 'px';
    currentelement.style.color = fontColor;

    setCurrentValue(current);
    setOpen(false);
  }

  function changeFontSize(e: number) {
    setFontSize(e);
  }
  function openDialog(e) {
    setCurrentElement(e.target);
    setOpen(true);
  }

  function changeFontColor(e: string) {
    console.log(e, 'changeFontColor')
    setFontColor(e);
  }

  return <Box
    className="section-wrapper"
  >
    <Header />

    <Box
      className="img-wrap"
      sx={{
        width: '100%',
        height: '500px',
        overflow: 'hidden', // обрезаем лишнее
        position: 'relative', // для абсолютного позиционирования картинки, если нужно
        textAlign: 'center', // для текста поверх картинки
      }}
    >
      <img
        src="/fon.jpg"
        alt="logo"
        style={{
          margin: '0 auto',
          width: '100%',       // растягиваем по ширине
          height: '100%',      // растягиваем по высоте контейнера
          objectFit: 'cover',  // обрезаем лишнее, сохраняя пропорции
          objectPosition: 'center', // центрируем картинку
          display: 'block',    // убираем лишние пробелы под картинкой
        }}
      />
    </Box>

    <TableContainer
      sx={{
        background: 'inherit',
        color: 'white'
      }}
      component={Paper}>
      <Table
        sx={{
          background: 'inherit'
        }}
        aria-label="simple table">
        <TableHead>
          <TableRow
          >
            <TableCell>Виды работ</TableCell>
            <TableCell align="right">Срок выполнения</TableCell>
            <TableCell align="right">Стоимость работ за еденицу</TableCell>
            <TableCell align="right">Стоимость работ всего</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.name}
              sx={{
                '&:last-child td, &:last-child th': {border: 0}
              }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell
                ref={refText}
                onClick={openDialog} align="right">{index == 1 ? currentValue : row.time}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.allPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Внесите изменения"}</DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={2}>
          текст: <Input
          onChange={(e) =>{
            setCurrent(e.target.value)}
          }
          ></Input>
      </Stack>
        <Stack direction="row" spacing={2}>
          Размер шрифта:
      <Input
        type="number"
      onChange={(e)=>{
        console.log(e.target.value, 'change')
        changeFontSize(e.target.value as unknown as number)
      }}
      />
      </Stack>
        <Stack direction="row" spacing={2}>
          Цвет шрифта:
          <Input
            type="color"
            onChange={(e)=>{
              console.log(e.target.value, 'change')
              changeFontColor(e.target.value as unknown as string)
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={changeValue}>Принять</Button>
        <Button onClick={handleClose}>Отменить</Button>
      </DialogActions>
    </Dialog>
  </Box>;

}
export {TablePage}
