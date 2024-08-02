import codeboost from "../Images/CodeBoost.png";
import github from "../Images/github-mark.png";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 border-b-2 border-grey-2 h-20">
      <img src={codeboost} alt="CodeBoost"/>
      <a
        href="https://github.com/abhirampai/codeboost"
        target="_blank"
        referrerPolicy="no-referrer" rel="noreferrer"
      >
        <img src={github} alt="github link" className="w-9 h-9 cursor-pointer" />
      </a>
    </div>
  );
};

export default Header;
