import * as React from "react";
import {
  ChangeEvent,
  cloneElement,
  FunctionComponentElement,
  useState,
} from 'react'

const Pagination = ({
  count,
  render,
}: {
  count: number
  render: FunctionComponentElement<{ skip: number; take: number }>
}) => {
  const [step, setStep] = useState(0);
  const [take, setAmountToFetch] = useState(10);
  const steps = count ? Math.ceil(count / take) : 0;
  const renderedSteps = new Array(steps).fill(0).map((num, index) => (
    <button
      data-is-active={index === step}
      key={index}
      type="button"
      onClick={() => setStep(index)}
    >
      {index + 1}
    </button>
  ));

  const renderWithProps = cloneElement(render, {
    skip: step * take,
    take,
  });

  return (
    <>
      {renderWithProps}
      <select
        name="amount to fetch"
        id="take"
        value={take}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          const newAmount = +e.target.value;
          setAmountToFetch(newAmount);
          setStep(0)
        }}
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>

      <button
        type="button"
        disabled={step === 0}
        onClick={() => setStep((prevstep) => prevstep - 1)}
      >
        {'<'}
      </button>
      {renderedSteps}
      <button
        type="button"
        disabled={(step + 1) * take > count}
        onClick={() => setStep((prevstep) => prevstep + 1)}
      >
        {'>'}
      </button>
    </>
  )
}

export default Pagination
