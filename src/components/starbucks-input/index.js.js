export default function StarbucksInput({name, value, onChange, error}) {
  
  function handelOnChange({target}){
    const {value} = target
    onChange(value)
  }

  return (
    <>
    <label htmlFor={name}>{name}</label>
    <input id={name} name={name} type={"text"} value={value} onChange={handelOnChange}></input>
    { error ? error : '' }
    </>
  );
}
