interface FloatingLabelProps {
  text: string;
  onChange: (e: any) => void;
  name: string;
  value: any;
}

export function FloatingLabel({ text, name, value, onChange }: FloatingLabelProps) {
  return (
    <div className="relative">
      <input
        type="number"
        id="floating_outlined"
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-[#3FBDF1] appearance-none dark:text-white dark:border-[#3FBDF1 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        onChange={onChange}
        value={value}
        name={name}
      />
      <label
        htmlFor="floating_outlined"
        className="absolute text-sm text-[#7DB9FF]/[.72] font-medium dark:text-[#7DB9FF]/[.72] duration-300 transform -translate-y-4 scale-90 top-2 z-10 origin-[0] bg-[#2268f3] ml-3 px-3"
      >
        {text}
      </label>
    </div>
  );
}
