import { getDeepCopy } from '../../utils/helpers';
import { Input } from '../Input';
import { ContainerTable, Td } from './style';
import PropTypes from "prop-types";

export const Table = ({ sudokuArr, setSudokuArr, initialArr }) => {
    const deepCopy = getDeepCopy(sudokuArr);
    const onInputChange = (e, row, col) => {
        const value = parseInt(e.target.value) || -1;
        const grid = deepCopy.slice(); // Criar uma cópia para não modificar o estado diretamente

        if (value === -1 || (value >= 1 && value <= 9)) {
            grid[row][col] = value;
            setSudokuArr(grid);
        }
    };
    return (
        <ContainerTable>
            <tbody>
                {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((row, rIndex) => (
                    <tr
                        key={rIndex}
                        className={(rIndex + 1) % 3 === 0 ? "borderBottom" : ""}
                    >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((col, cIndex) => (
                            <Td
                                key={rIndex * 9 + cIndex}
                                className={(cIndex + 1) % 3 === 0 ? "borderRight" : ""}
                            >
                                <Input
                                    onChange={(e) => onInputChange(e, rIndex, cIndex)}
                                    value={sudokuArr[rIndex][cIndex] === -1 ? "" : sudokuArr[rIndex][cIndex]}
                                    disable={initialArr[rIndex][cIndex] !== -1}
                                />
                            </Td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </ContainerTable>
    );
};

Table.propTypes = {
    sudokuArr: PropTypes.array.isRequired,
    setSudokuArr: PropTypes.func.isRequired,
    initialArr: PropTypes.array.isRequired,
};


