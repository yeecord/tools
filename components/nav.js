import {Box, Button, Flex, Heading, Icon, Image, Link, Text} from "@chakra-ui/react"
import {ExternalLinkIcon, HamburgerIcon, SmallCloseIcon} from "@chakra-ui/icons"
import {useState} from "react"
import {FaGithub} from "react-icons/fa"
import {useRouter} from "next/router";

export function Nav() {
	const [isOpen, setIsOpen] = useState(false)
	
	const toggle = () => setIsOpen(!isOpen)
	
	return (
		<>
			<NavBarContainer>
				<Logo/>
				<Menu>
					<Links/>
				</Menu>
				<MenuToggle toggle={toggle} isOpen={isOpen}/>
			</NavBarContainer>
			<MobileMenu isOpen={isOpen}>
				<Links/>
			</MobileMenu>
		</>
	)
}

function Links() {
	return (
		<>
			<ExternalLink href="https://github.com/yeecord/tools" icon={FaGithub} label="Github"/>
		</>
	)
}

function Menu({ children }) {
	return (
		<Flex gap={.75} display={["none", "block"]}>
			{children}
		</Flex>
	)
}

function MobileMenu({ children, isOpen }) {
	return (
		<Flex
			flexDirection="column"
			gap={.75}
			display={isOpen ? ["block", "none"] : "none"}
			position="absolute"
			top={16}
			bg="gray.800"
			w="full"
			h="full"
			zIndex={99}
			px={2}
		>
			{children}
		</Flex>
	)
}

function ExternalLink({ href, label, icon }) {
	return (
		<Link rel="noreferrer" href={href} target="_blank" aria-label={label}>
			<Button variant="ghost" display="block">
				<Flex alignItems="center" gap=".75rem">
					<Icon as={icon} w={6} h={6}/>
					<Text>{label}</Text>
					<ExternalLinkIcon/>
				</Flex>
			</Button>
		</Link>
	)
}

function NavBarContainer({ children }) {
	return (
		<Flex
			top={0}
			position="sticky"
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			mb={[4, 6, 8]}
			py={2.5}
			px={6}
			bg="gray.800"
			zIndex={100}
			borderBottom={1}
			borderStyle="solid"
			borderColor="gray.500"
		>
			{children}
		</Flex>
	)
}

export function Logo() {
	const router = useRouter()
	
	return (
		<a href="https://tools.yeecord.com/" onClick={(e) => {
			e.preventDefault()
			router.push("/calculator")
		}}>
			<Flex gap=".75rem" alignItems="center">
				<Image src="https://yeecord.com/img/logo.png" borderRadius="full" boxSize="32px" alt="Yeecord"/>
				<Heading as="h3" fontSize="lg" fontWeight="bold" fontFamily="Readex Pro">
					Yeecord
				</Heading>
			</Flex>
		</a>
	)
}

export function Item({ children, to }) {
	return (
		<Link href={to}>
			<Text display="block">
				{children}
			</Text>
		</Link>
	)
}

export function MenuToggle({ toggle, isOpen }) {
	return (
		<Box display={["block", "none"]} onClick={toggle}>
			{isOpen ? <SmallCloseIcon w={6} h={6}/> : <HamburgerIcon w={6} h={6}/>}
		</Box>
	)
}