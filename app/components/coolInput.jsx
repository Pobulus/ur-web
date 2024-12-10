import styles from "../../styles/inputs.module.css";

function CoolInput({ placeholder, value, onChange, type = 'text' }) {
  return (
    <>
   
      <div className={styles.inputContainer}>
  <input
    className={styles.input}
    name="text"
    type={type}
    placeholder={placeholder}
    onChange={onChange} value={value}
  />
</div>

    </>
  );
}
export default CoolInput;