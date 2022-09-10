import {Box, Button, Flex, Heading, Icon, Image, Link, Text} from "@chakra-ui/react"
import {ExternalLinkIcon, HamburgerIcon, SmallCloseIcon} from "@chakra-ui/icons"
import {useState} from "react"
import {FaGithub} from "react-icons/fa"

export function Nav() {
	const [isOpen, setIsOpen] = useState(false)
	
	const toggle = () => setIsOpen(!isOpen)
	
	return (
		<NavBarContainer>
			<Logo/>
			<a style={{ lineHeight: "100%" }} href="https://github.com/yeecord/tools" target="_blank" aria-label="Github">
				<Button variant="ghost">
					<Flex alignItems="center" gap=".75rem">
						<Icon as={FaGithub} w={6} h={6}/>
						<Text>Github</Text>
						<ExternalLinkIcon/>
					</Flex>
				</Button>
			</a>
			<MenuToggle toggle={toggle} isOpen={isOpen}/>
		</NavBarContainer>
	)
}

function NavBarContainer({ children }) {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			mb={[4, 6, 8]}
			py={2.5}
			px={6}
			bg={["primary.500", "primary.500", "transparent", "transparent"]}
			color={["white", "white", "primary.700", "primary.700"]}
			borderBottom={1}
			borderStyle="solid"
			borderColor={"gray.500"}
		>
			{children}
		</Flex>
	)
}

export function Logo() {
	return (
		<a href="https://tools.yeecord.com/">
			<Flex gap=".75rem" alignItems="center">
				<Image src="https://yeecord.com/img/logo.png" borderRadius="full" boxSize="32px" alt="Yeecord"/>
				<Heading as="h2" fontSize="lg" fontWeight="bold" fontFamily="Readex Pro">
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
		<Box display={{ base: "block", md: "none" }} onClick={toggle}>
			{isOpen ? <SmallCloseIcon w={6} h={6}/> : <HamburgerIcon w={6} h={6}/>}
		</Box>
	)
}