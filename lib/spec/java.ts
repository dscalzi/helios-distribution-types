import { Platform, Architecture } from './system'

/**
 * Supported JDK Distributions
 * 
 * @since 1.1.0
 */
export enum JdkDistribution {
    /**
     * Amazon Corretto
     * @see https://aws.amazon.com/corretto/
     * @since 1.1.0
     */
    CORRETTO = 'CORRETTO',
    /**
     * Eclipse Temurin
     * @see https://projects.eclipse.org/projects/adoptium.temurin
     * @since 1.1.0
     */
    TEMURIN = 'TEMURIN',
}

/**
 * Java Version. The format is version dependent.
 * 
 * JDK 8 and prior
 * 1.{major}.{minor}_{revision}-b{build}
 * Ex. 1.8.0_152-b16
 * 
 * JDK 9+
 * {major}.{minor}.{revision}+{build}
 * Ex. 11.0.12+7
 * 
 * @since 1.1.0
 */
export interface JavaVersion {
    /**
     * Major version component.
     * @since 1.1.0
     */
    major: number
    /**
     * Minor version component.
     * On JDK 8 and below, this is always 0.
     * @since 1.1.0
     */
    minor: number
    /**
     * Revision version component.
     * On JDK 8 and below, this is known as update number.
     * @since 1.1.0
     */
    revision: number
    /**
     * Build number version component.
     * @since 1.1.0
     */
    build: number
}

/**
 * Conditions used to validate a major Java version.
 * @since 1.1.0
 */
export interface JavaVersionMatrix {
    /**
     * The absolute minimum version allowed for this major version.
     * Formatting must match that of the corresponding major version.
     * If omitted, there will be no lower limit for this major version.
     * @since 1.1.0
     */
    minimum?: string
    /**
     * The absolute maximum version allowed for this major version.
     * Formatting must match that of the corresponding major version.
     * If omitted, there will be no upper limit for this major version.
     * @since 1.1.0
     */
    maximum?: string
    /**
     * A list of blacklisted versions.
     * Formatting must match that of the corresponding major version.
     * If omitted, no versions of this major version will be blacklisted.
     * @since 1.1.0
     */
    blacklist?: string[]
}

/**
 * Java validation rules for a specific platform.
 * @since 1.1.0
 */
export interface JavaPlatformMatrix {
    /**
     * The platform that this validation matrix applies to.
     * @since 1.1.0
     */
    platform: Platform | 'all'
    /**
     * The architecture that this validation matrix applies to.
     * @since 1.1.0
     */
    architecture: Architecture | 'all'

    /**
     * Preferred JDK distribution.
     * If omitted, the client will decide (decision may be platform-specific).
     * @since 1.1.0
     */
    distribution?: JdkDistribution

    /**
     * A list of supported major versions.
     * If omitted, the client will decide based on the game version.
     * @since 1.1.0
     */
    supported?: number[]

    /**
     * A matrix used to provide validation rules by major version.
     * If omitted, no rules will be applied.
     * @since 1.1.0
     */
    versionMatrices?: {
        /**
         * Validation rules for the specific major version.
         * If the list of supported major versions is provided, this major
         * version must be present in that list.
         * If not provided, this major version must be recognized as a supported
         * version by the client.
         * Otherwise, this value will be ignored.
         * @since 1.1.0
         */
        [major: string]: JavaVersionMatrix
    }

    /**
     * RAM settings.
     * @since 1.1.0
     */
    ram: {
        /**
         * The recommended amount of RAM.
         * @since 1.1.0
         */
        recommended: number
        /**
         * The absolute minimum amount of RAM.
         * @since 1.1.0
         */
        minimum: number
    }
}

/**
 * Java options.
 * @since 1.1.0
 */
export interface JavaOptions {

    /**
     * Java validation rules for this server configuration.
     * Validation rules will be delegated to the client for
     * any undefined properties. Java validation can be configured
     * for specific platforms and architectures. The most specific
     * ruleset will be applied. For example, if a matrix for platform
     * and architecture 'all' is specified, it will be used as the
     * base set of rules. If a matrix is present for the current os,
     * its validation rules will take precedence over the 'all'
     * configuration.
     * 
     * Maxtrix Precedence (Highest - Lowest)
     * - Current platform (ex. win32 x64)
     * - 'all' architecture (ex. win32 all)
     * - 'all' platform (ex. all all)
     * - Client logic (default logic in the client)
     * 
     * A specific architecture with a wildcard platform is not supported.
     * Any matrices provided with this format will be ignored.
     * Ex. (all x64) is not valid.
     * 
     * @since 1.1.0
     */
    validationMatrices?: JavaPlatformMatrix[]

}