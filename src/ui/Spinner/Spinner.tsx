interface ISpinnerProps {
  size?: number;
}

const Spinner = ({ size = 24 }: ISpinnerProps) => {
  return (
    <div
      style={{ height: size, width: size }}
      className="animate-rotate360 bg-transparent rounded-full  border-b-gray-300 border-l-gray-300 border-[3px] transform-gpu  border-t-transparent  border-r-transparent"
    />
  );
};

export default Spinner;

Spinner.displayName = "Spinner";
