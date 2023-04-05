import React, {FC, useState} from 'react';
import cl from './CustomSelect.module.sass';
import SelectIcon from 'static/selectIcon.svg';
import {SelectProps} from "components/FilterBar";


interface CustomSelectProps {
    selectValues: SelectProps[];
    selectedValue: SelectProps;
    setSelectedValue: (e: SelectProps) => void
}

const CustomSelect: FC<CustomSelectProps> = ({selectValues, selectedValue, setSelectedValue}) => {

    const setSortType = (select: SelectProps) => {
        if(select.id === 0) return
        setSelectedValue(select)
        setSelectOpen(false)
    }
    const [selectOpen, setSelectOpen] = useState<boolean>(false)


    return (
        <div className="filter__item">
            <div className="filter__title">Сортировка</div>
            <div className={cl.filter__select}>
                <div
                    className={[cl.filter__header, selectOpen ? cl.active : ''].join(' ')}
                    onClick={() => setSelectOpen(!selectOpen)}
                >
                    <span>{selectedValue.title}</span>
                    <img src={SelectIcon} className={[cl.filter__icon, selectOpen ? cl.active : ''].join(' ')} alt=""/>
                </div>
                <div className={[cl.filter__body, selectOpen ? cl.active : ''].join(' ')}>
                    {selectValues.map(select =>
                        <div
                            key={select.id}
                            className={cl.filter__body_item}
                            onClick={() => setSortType(select)}
                        >
                            {select.title}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomSelect;
