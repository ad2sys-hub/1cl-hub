import { useSovereign } from '../hooks/useSovereign';

export default function Footer() {
  const { t } = useSovereign();

  return (
    <footer className="border-t border-white/5 bg-clBlack pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-auto z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center space-y-12">
        
        {/* Signatures */}
        <div className="text-center space-y-6">
          <p className="text-clChrome tracking-[0.2em] text-xs uppercase font-serif opacity-70">
            {t('footer.tagline')}
          </p>
          <div className="flex justify-center opacity-80 hover:opacity-100 transition-opacity">
            <img src="/1cl-hub/images/Logos/logo CL v.1.gold.png" alt="Chawblick" className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]" />
          </div>
        </div>

        {/* Links & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full border-t border-white/5 pt-8 gap-6">
          <div className="flex items-center gap-3">
            <img src="/1cl-hub/images/Logos/logo CL v.1.chrome.png" alt="1CL Small" className="h-6 w-auto opacity-50" />
            <span className="text-xs text-gray-500 tracking-widest uppercase">{t('footer.copyright')}</span>
          </div>

          <div className="flex gap-6 text-xs tracking-widest font-bold">
            <a href="#" className="text-gray-400 hover:text-clGold transition-colors border border-transparent hover:border-clGold/50 rounded-full py-1 px-3">
              IG
            </a>
            <a href="#" className="text-gray-400 hover:text-clGold transition-colors border border-transparent hover:border-clGold/50 rounded-full py-1 px-3">
              X
            </a>
            <a href="#" className="text-gray-400 hover:text-clGold transition-colors border border-transparent hover:border-clGold/50 rounded-full py-1 px-3">
              YT
            </a>
          </div>

          <div className="flex gap-4 text-xs text-gray-500 tracking-wider">
            <a href="#" className="hover:text-clChrome transition-colors">{t('footer.legal')}</a>
            <span>|</span>
            <a href="#" className="hover:text-clChrome transition-colors">{t('footer.contact')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
