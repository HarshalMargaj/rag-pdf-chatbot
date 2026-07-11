import { UserButton, Show, useUser } from "@clerk/nextjs";
import { FiLogIn } from "react-icons/fi";
import Link from "next/link";

type SidebarUser = ReturnType<typeof useUser>["user"];

interface SidebarUserFooterProps {
	isOpen: boolean;
	isSignedIn: boolean | undefined;
	user: SidebarUser | undefined;
}

const SidebarUserFooter = ({
	isOpen,
	isSignedIn,
	user,
}: SidebarUserFooterProps) => {
	return (
		<>
			<Show when="signed-in">
				<div
					className={`${isOpen ? "flex items-center gap-4" : "flex items-center justify-center"} border-t border-[#1F1F27] p-4 mt-auto`}
				>
					<div>
						<UserButton />
					</div>
					{isOpen && (
						<div>
							<div className="text-white">{user?.fullName}</div>
							<div className="text-[#71717A] text-sm">
								{user?.emailAddresses[0].emailAddress}
							</div>
						</div>
					)}
				</div>
			</Show>
			{!isSignedIn && (
				<Link
					href={"/sign-in"}
					className="border border-[#1F1F27] p-2 px-4 rounded-md text-[#A1A1AA] text-sm cursor-pointer bg-transparent transition-colors hover:border-zinc-700 hover:text-zinc-200 text-center m-4 mt-auto"
				>
					{isOpen ? "Log in" : <FiLogIn />}
				</Link>
			)}
		</>
	);
};

export default SidebarUserFooter;
