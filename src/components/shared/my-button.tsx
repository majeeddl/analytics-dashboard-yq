interface MyButtonProps {
  label: string;
  onClick: () => void;
}

const MyButton = ({ label, onClick }: MyButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};

export default MyButton;
