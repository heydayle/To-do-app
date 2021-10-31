import DropDownPicker from 'react-native-dropdown-picker';
import type {Style} from '../../typeDefinition';

type Props = {
  selected?: number,
};

export default function DropdownSelect(props: Props) {
  const {selected} = props;
  this.state = {
    country: selected,
  };
  return (
    <DropDownPicker
      items={[
        {
          label: 'UK',
          value: 1,
        },
        {
          label: 'France',
          value: 2,
        },
      ]}
      defaultValue={selected}
      containerStyle={{height: 40}}
      style={{backgroundColor: '#fafafa'}}
      itemStyle={{
        justifyContent: 'flex-start',
      }}
      dropDownStyle={{backgroundColor: '#fafafa'}}
      onChangeItem={(item) =>
        this.setState({
          country: item.value,
        })
      }
    />
  );
}
