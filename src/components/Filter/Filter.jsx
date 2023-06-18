import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import style from './Filter.module.scss';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import { useSelector } from 'react-redux';

export const Filter = ({ onFilterChange }) => {
  const artworksForFilter = useSelector((state) => state.artworks.allitems.item);

  const filterTechniqueArray = artworksForFilter.map((item) => {
    const { technique } = item;
    const techniqueArray = technique.flat();

    const uniqueTechniqueArray = Array.from(new Set(techniqueArray));
    return uniqueTechniqueArray;
  });
  const filterMaterialArray = artworksForFilter.map((item) => {
    const { material } = item;
    const materialArray = material.flat();

    const uniqueMaterialArray = Array.from(new Set(materialArray));
    return uniqueMaterialArray;
  });

  const combinateTechniqueArray = [].concat(...filterTechniqueArray);
  const uniqueTechniqueArray = combinateTechniqueArray.filter((item, index) => {
    return combinateTechniqueArray.indexOf(item) === index;
  });
  const combinateMaterialArray = [].concat(...filterMaterialArray);
  const uniqueMaterialArray = combinateMaterialArray.filter((item, index) => {
    return combinateMaterialArray.indexOf(item) === index;
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className={style.filter}>
      <Accordion className={style.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Technique</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <RadioGroup
              onChange={handleFilterChange}
              aria-labelledby='demo-radio-buttons-group-label'
              name='technique'
            >
              {uniqueTechniqueArray.map((item, index) => (
                <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
              ))}
            </RadioGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={style.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Material</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <RadioGroup
              onChange={handleFilterChange}
              aria-labelledby='demo-radio-buttons-group-label'
              name='material'
            >
              {uniqueMaterialArray.map((item, index) => (
                <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
              ))}
            </RadioGroup>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
