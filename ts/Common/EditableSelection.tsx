import React, {useState} from 'react';

type Props = {
    values: string[];
	setValue: (field: string, value: string[]) => Promise<void>;
	field: string;
	options: {[key: string]: string};
	placeholder?: string;
	invert?: boolean;
}

const EditableSelection: React.FC<Props> = ({ setValue, field, values: currentValues, options, placeholder, invert = false }) => {
	const [active, setActive] = useState<boolean>(false);

	currentValues = currentValues || [];

	function onClick(ev) {
		ev.stopPropagation();

		setActive(!active);
	}

	function addOption(optionKey: string, selected: boolean) {
		if (selected) {
			if (currentValues.indexOf(optionKey) < 0) {
				setValue(field, [...currentValues, optionKey]);
			}
		} else {
			setValue(field, currentValues.filter(value => value !== optionKey));
		}
	}

	const selection = !invert ? currentValues : (currentValues.length ? Object.keys(options).filter(option => currentValues?.indexOf(option) < 0) : []);

	return (<>
		<a className="action-rename" onClick={onClick}>{selection.join(', ') || placeholder}</a>
		{active && <ul className="bbb-selection">
			{Object.keys(options).map(key => {
				const label = options[key];

				return (
					<li key={key}>
						<input
							type="checkbox"
							id={key}
							className="checkbox"
							checked={(currentValues.indexOf(key) > -1) !== invert}
							value="1"
							onChange={(ev) => addOption(key, ev.target.checked !== invert)} />
						<label htmlFor={key}>{label}</label>
					</li>
				);
			})}
		</ul>}
	</>);
};

export default EditableSelection;
