import GoogleLogo from "../../assets/GoogleLogo";
import YandexLogo from "../../assets/YandexLogo";
import AppleLogo from "../../assets/AppleLogo";

const providerIcons = {
    google: {
        logo: GoogleLogo,
        w: 26,
        h: 26,
    },
    yandex: {
        logo: YandexLogo,
        w: 32,
        h: 32,
    },
    apple: {
        logo: AppleLogo,
        w: 26,
        h: 26,
    },
};

function O2Auth({ providers }) {
    return (
        <div className="flex gap-4 justify-between items-center w-full px-8">
            {providers.map((provider, index) => {
                const IconComponent = providerIcons[provider.name];

                return (
                    <span
                        key={`provider_${provider.name}`}
                        className="w-full h-[48px] border border-gray-200 bg-gray-100 rounded-xl flex justify-center items-center hover:bg-gray-300 duration-300 cursor-pointer"
                        onClick={() => window.open(provider.href)}
                    >
                        {IconComponent ? (
                            <IconComponent.logo
                                width={IconComponent.w}
                                height={IconComponent.h}
                            />
                        ) : (
                            provider.name
                        )}
                    </span>
                );
            })}
        </div>
    );
}

export default O2Auth;
