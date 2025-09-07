import {FC} from 'react'
import {NumberInputProps} from 'sanity'

export const DollarInput: FC<NumberInputProps> = (props) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      width: '100%',
    }}
  >
    <span>$</span>
    <div style={{flexGrow: 1}}>
      <props.renderDefault {...props} />
    </div>
  </div>
)
