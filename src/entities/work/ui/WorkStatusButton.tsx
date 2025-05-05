import React, { useRef, useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { WorkCategory } from '../api';

interface WorkStatusButtonProps {
  defaultOption: WorkCategory;
  options: WorkCategory[];
  onSelectOption: any;
}

const workCategoryMap: Record<WorkCategory, string> = {
  UPDATE: '업데이트',
  CHORE: '기타 수정',
  FEAT: '기능 개발',
  REFACTOR: '리팩토링',
};

export const WorkStatusButton = ({ options, onSelectOption, defaultOption }: WorkStatusButtonProps) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const anchorRef = useRef<HTMLDivElement>(null);

  const handleClick = () => setOpen((prev) => !prev);

  const handleClickMenuItem = (index: number) => {
    setSelectedIndex(index);
    setOpen(false);

    onSelectOption(options[index]);
  };

  const handleToggle = () => setOpen((prev) => !prev);

  const handleClose = (event: Event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) return;
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant='contained'
        ref={anchorRef}
        aria-label='split button'
        sx={{
          height: '30px',
          '.MuiButtonGroup-firstButton': {
            textAlign: 'left',
            justifyContent: 'flex-start',
            padding: 1,
          },
          '.MuiButtonGroup-lastButton': {
            minWidth: '12px',
          },
        }}
      >
        <Button onClick={handleClick} className='w-[60px]'>
          <span className='text-[10px]'>{workCategoryMap[defaultOption]}</span>
        </Button>
        <Button
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}
          className='w-[20px]'
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu' autoFocusItem>
                  {options?.map((option, index) => (
                    <MenuItem
                      key={index}
                      selected={index === selectedIndex}
                      onClick={() => handleClickMenuItem(index)}
                      className='lowercase'
                    >
                      {workCategoryMap[option as WorkCategory]}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};
