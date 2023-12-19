import { memo, useCallback, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import dayjs from 'dayjs';

import { Button, Paper } from '@mui/material';

import MemoList from '../list/MemoList';

import useInput from '~/hooks/useInput';
import { memoQueryKeys, useAddMemo } from '~/queries/memo';
import { useSnackbarStore } from '~/stores/useSnackbarStore';

interface IProps {
  targetDate: string;
}
const TodayMemo = ({ targetDate }: IProps) => {
  const queryClient = useQueryClient();

  const { input, handleInput, reset } = useInput();
  const { mutate } = useAddMemo();

  const { updateSnackbarState } = useSnackbarStore();

  const handleAddMemo = () => {
    mutate(
      { content: input, date: targetDate },
      {
        onSuccess: () => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: '저장하였습니다.',
            vertical: 'bottom',
          });
          queryClient.invalidateQueries(memoQueryKeys.fetchMemoList({}));

          reset();
        },
        onError: (error: any) => {
          updateSnackbarState({
            open: true,
            horizontal: 'center',
            message: error.message,
            vertical: 'bottom',
          });
        },
      },
    );
  };

  return (
    <div>
      <h3>MEMO</h3>

      <Paper
        elevation={1}
        className='input-container'
        css={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 8,
          backgroundColor: '#dbdbdb42',
          padding: 10,
          marginTop: 20,
          marginBottom: 20,
          width: '100%',
          height: '150px',
          borderRadius: 10,
        }}
      >
        <textarea
          value={input}
          onChange={handleInput}
          style={{
            width: '100%',
            height: '120px',
            fontSize: '15px',
            resize: 'none',
            padding: 10,
            borderRadius: 8,
            border: '1px solid rgb(153 153 153 / 38%)',
          }}
        />
        <div
          css={{
            display: 'flex',
            gap: 10,
          }}
        >
          <Button
            sx={{
              height: '30px',
              '.MuiButtonGroup-firstButton': {
                width: '60px',
                textAlign: 'left',
                justifyContent: 'flex-start',
                padding: 1,
              },
              '.MuiButtonGroup-lastButton': {
                width: '12px',
                minWidth: '12px',
              },
            }}
            variant='contained'
            onClick={handleAddMemo}
          >
            저장하기
          </Button>
        </div>
      </Paper>
      <MemoList targetDate={targetDate} />
    </div>
  );
};

export default TodayMemo;
