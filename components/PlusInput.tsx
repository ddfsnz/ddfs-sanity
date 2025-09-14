import {FC} from 'react'
import {NumberInputProps} from 'sanity'

export const PlusInput: FC<NumberInputProps> = (props) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      width: '100%',
    }}
  >
    <div style={{flexGrow: 1}}>
      <props.renderDefault {...props} />
    </div>
    <span>+</span>
  </div>
)
